import { Mensaje } from './../../../modules/newModules/conversation';
import { Chat, Usuario } from './../../../modules/newModules/usuario';
import { FirebaseServiceService } from 'src/app/servicios/nuevosServicios/firebase-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from 'src/app/modules/newModules/conversation';

@Component({
  selector: "app-chatroom",
  templateUrl: "./chatroom.component.html",
  styleUrls: ["./chatroom.component.scss"],
})
export class ChatroomComponent implements OnInit, OnDestroy {
  chat: Chat;
  conversation: Conversation;
  message: string;
  user: Usuario;
  constructor(
    private router: Router,
    private firebaseServ: FirebaseServiceService
  ) {
    this.chat = this.router.getCurrentNavigation().extras.state.chat;
  }

  ngOnInit() {
    console.log("aka de nuevo");
    this.user = this.firebaseServ.localUser;
    this.firebaseServ.setSubscription(this.firebaseServ.loadConversation(this.chat.chat).subscribe((res: Conversation) => {
      console.log("cambio ");
      this.conversation = res;
    }));
  }
  ngOnDestroy(): void {
    this.firebaseServ.destroySubscription();
  }
  sendMessage() {
    const mensaje: Mensaje = {
      idUser: this.firebaseServ.localUser.idUsuario,
      mensaje: this.message,
    };
    this.conversation.mensajes.push(mensaje);
    this.firebaseServ.sendMessage(this.chat.chat, this.conversation);
    this.message = "";
  }
}
