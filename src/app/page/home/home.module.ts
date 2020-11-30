import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { LandingComponentComponent } from '../newPages/landing-component/landing-component.component';
import { SharedComponentModule } from 'src/app/sharedComponent/shared-component/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    SharedComponentModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
