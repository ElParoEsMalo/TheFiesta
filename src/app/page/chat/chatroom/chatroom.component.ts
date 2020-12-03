import { Mensaje } from './../../../modules/newModules/conversation';
import { Chat, Usuario } from './../../../modules/newModules/usuario';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from 'src/app/modules/newModules/conversation';
import { FirebaseServiceService } from 'src/app/servicios/firebaseServ/firebase-service.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit, OnDestroy {
  @ViewChild(IonContent, {read: IonContent, static: false}) content: IonContent;
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
    console.log('aka de nuevo');
    this.user = this.firebaseServ.localUser;
    this.firebaseServ.openChat(this.chat.idChat);
    this.firebaseServ.setSubscription(this.firebaseServ.loadConversation(this.chat.idChat).subscribe((res: Conversation) => {
      console.log('cambio ');
      this.conversation = res;
    }));
  }
  ngOnDestroy(): void {
    this.firebaseServ.destroySubscription();
    this.firebaseServ.closeChat(this.chat.idChat);
  }
  sendMessage() {
    const mensaje: Mensaje = {
      idUser: this.firebaseServ.localUser.idUsuario,
      mensaje: this.message,
    };
    this.conversation.mensajes.push(mensaje);
    this.firebaseServ.sendMessage(this.chat.idChat, this.conversation).then(res=>{
      this.message = '';
      this.content.scrollToBottom(300);
    });
  }
}
