import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { BuscadorAmigosComponent } from './buscador-amigos/buscador-amigos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule
  ],
  declarations: [ChatPage,BuscadorAmigosComponent,ChatListComponent,ChatroomComponent]
})
export class ChatPageModule {}
