import { Usuario } from 'src/app/modules/newModules/usuario';
import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from 'src/app/servicios/firebaseServ/firebase-service.service';

@Component({
  selector: 'app-buscador-amigos',
  templateUrl: './buscador-amigos.component.html',
  styleUrls: ['./buscador-amigos.component.scss'],
})
export class BuscadorAmigosComponent implements OnInit {
  users: Array<Usuario> = [];
  constructor(private firebaseServ: FirebaseServiceService) { }

  ngOnInit() {}
  search(value: string) {
    this.firebaseServ.searchUsers(value, this.users.length).then((res: Array<Usuario>) => {
      console.log(res);
      this.users = res.filter(element => {
        return !(this.firebaseServ.localChat.map(chat => chat.nombre).indexOf(element.idUsuario) >= 0)
          && element.idUsuario !== this.firebaseServ.localUser.idUsuario;
      });

    });
  }
  addToChat(item: string) {
    console.log(item);
    this.firebaseServ.createChat(item);
    this.users = this.users.filter(element => element.idUsuario !== item);
  }

}
