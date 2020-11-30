import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistUserProfilePageRoutingModule } from './regist-user-profile-routing.module';

import { RegistUserProfilePage } from './regist-user-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistUserProfilePageRoutingModule
  ],
  declarations: [RegistUserProfilePage]
})
export class RegistUserProfilePageModule {}
