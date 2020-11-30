import { Usuario } from 'src/app/modules/newModules/usuario';
import { FirebaseServiceService } from 'src/app/servicios/nuevosServicios/firebase-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador-amigos',
  templateUrl: './buscador-amigos.component.html',
  styleUrls: ['./buscador-amigos.component.scss'],
})
export class BuscadorAmigosComponent implements OnInit {
  users:Array<Usuario>;
  constructor(private firebaseServ:FirebaseServiceService) { }

  ngOnInit() {}
  search(value:string){
    this.firebaseServ.searchUsers(value).then((res:Array<Usuario>)=>{
      this.users=res.filter(element=>{
        return !this.firebaseServ.localUser.chats.map(chat=> chat.nombre).includes(element.idUsuario)
          &&element.idUsuario!==this.firebaseServ.localUser.idUsuario; 
      })
      
    });
  }
  addToChat(item:string) {
    this.firebaseServ.createChat(item)
  }

}
