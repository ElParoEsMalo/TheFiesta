import { CreateEditEventComponent } from './create-edit-event/create-edit-event.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ListComponent } from './list/list.component';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
  {
    path: 'edit',
    component: EditProfileComponent
  },
  {
    path: 'events',
    component: ListComponent
  }
  ,
  {
    path: 'create',
    component: CreateEditEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
