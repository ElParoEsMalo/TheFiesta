import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalUserEventsPage } from './modal-user-events.page';

const routes: Routes = [
  {
    path: '',
    component: ModalUserEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalUserEventsPageRoutingModule {}
