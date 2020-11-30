import { CreateElementComponent } from './../newPages/create-element/create-element.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPageRoutingModule } from './test-routing.module';

import { TestPage } from './test.page';
import { LandingComponentComponent } from '../newPages/landing-component/landing-component.component';
import { BuscadorComponent } from '../newPages/buscador/buscador.component';
import { UserHomePageModule } from '../newPages/user-home/user-home.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    TestPageRoutingModule,
    UserHomePageModule
  ],
  declarations: [TestPage, CreateElementComponent, LandingComponentComponent],
  exports: [CreateElementComponent]

})
export class TestPageModule {}
