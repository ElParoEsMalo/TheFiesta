import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsFriendPageRoutingModule } from './tabs-friend-routing.module';

import { TabsFriendPage } from './tabs-friend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsFriendPageRoutingModule
  ],
  declarations: [TabsFriendPage]
})
export class TabsFriendPageModule {}
