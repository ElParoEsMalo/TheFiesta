import { Usuario } from 'src/app/modules/newModules/usuario';
import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from 'src/app/servicios/firebaseServ/firebase-service.service';

@Component({
  selector: 'app-buscador-amigos',
  templateUrl: './buscador-amigos.component.html',
  styleUrls: ['./buscador-amigos.component.scss'],
})
export class BuscadorAmigosComponent implements OnInit {
  users: Array<Usuario>;
  constructor(private firebaseServ: FirebaseServiceService) { }

  ngOnInit() {}
  search(value: string) {
    this.firebaseServ.searchUsers(value).then((res: Array<Usuario>) => {
      this.users = res.filter(element => {
        return !this.firebaseServ.localChat.map(chat => chat.nombre).includes(element.idUsuario)
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
