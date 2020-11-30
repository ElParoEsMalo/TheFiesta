import { SharedComponentModule } from './../../sharedComponent/shared-component/shared-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscadorPageRoutingModule } from './buscador-routing.module';

import { BuscadorPage } from './buscador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscadorPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [BuscadorPage]
})
export class BuscadorPageModule {}
