import { CreateEditEventComponent } from './create-edit-event/create-edit-event.component';
import { ListComponent } from './list/list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { SharedComponentModule } from 'src/app/sharedComponent/shared-component/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SharedComponentModule
  ],
  declarations: [ProfilePage,EditProfileComponent,ListComponent,CreateEditEventComponent]
})
export class ProfilePageModule {}
