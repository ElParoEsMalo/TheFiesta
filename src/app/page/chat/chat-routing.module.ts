import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { BuscadorAmigosComponent } from './buscador-amigos/buscador-amigos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPage } from './chat.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPage,
  },
  {
    path: 'chat',
    component: ChatroomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
