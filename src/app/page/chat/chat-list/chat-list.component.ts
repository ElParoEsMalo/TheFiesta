import { Router, NavigationExtras } from '@angular/router';
import { Chat } from './../../../modules/newModules/usuario';
import { FirebaseServiceService } from './../../../servicios/nuevosServicios/firebase-service.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  groups:Array<Chat>;
  constructor(private firebaseServ:FirebaseServiceService,private router:Router) {
   }

  ngOnInit() {
    const chat=this.firebaseServ.localUser.chats.map(res=>res.chat);
    this.groups=this.firebaseServ.localUser.chats;
    //this.firebaseServ.loadConversation(chat);
  }
  chat(chat:Chat){
    const navigate:NavigationExtras={
      state: {
        chat
      }
    };
    this.router.navigateByUrl(this.router.url+"/chat", navigate);
  }

}
