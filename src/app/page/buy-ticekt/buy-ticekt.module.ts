import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyTicektPageRoutingModule } from './buy-ticekt-routing.module';

import { BuyTicektPage } from './buy-ticekt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyTicektPageRoutingModule
  ],
  declarations: [BuyTicektPage]
})
export class BuyTicektPageModule {}
