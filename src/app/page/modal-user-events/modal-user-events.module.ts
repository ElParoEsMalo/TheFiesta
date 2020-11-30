import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalUserEventsPageRoutingModule } from './modal-user-events-routing.module';

import { ModalUserEventsPage } from './modal-user-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalUserEventsPageRoutingModule
  ],
  declarations: [ModalUserEventsPage]
})
export class ModalUserEventsPageModule {}
