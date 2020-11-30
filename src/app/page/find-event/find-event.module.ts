import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindEventPageRoutingModule } from './find-event-routing.module';

import { FindEventPage } from './find-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindEventPageRoutingModule
  ],
  declarations: [FindEventPage]
})
export class FindEventPageModule {}
