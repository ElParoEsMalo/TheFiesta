import { BuscadorComponent } from './../buscador/buscador.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserHomePageRoutingModule } from './user-home-routing.module';

import { UserHomePage } from './user-home.page';
import { PerfilComponent } from './perfil/perfil.component';
import { EventListComponent } from '../event-list/event-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserHomePageRoutingModule,
  ],
  declarations: [UserHomePage,HomePageComponent,PerfilComponent,BuscadorComponent],
  exports: [EventListComponent]
})
export class UserHomePageModule {}
