import { Router, NavigationExtras } from '@angular/router';
import { Chat } from './../../../modules/newModules/usuario';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FirebaseServiceService } from 'src/app/servicios/firebaseServ/firebase-service.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  groups: Array<Chat>;
  constructor(private firebaseServ: FirebaseServiceService, private router: Router) {
   }

  ngOnInit() {
  }
  chat(chat: Chat) {
    const navigate: NavigationExtras = {
      state: {
        chat
      }
    };
    this.router.navigateByUrl(this.router.url + '/chat', navigate);
  }

}
