import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistUserProfilePage } from './regist-user-profile.page';

const routes: Routes = [
  {
    path: '',
    component: RegistUserProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistUserProfilePageRoutingModule {}
