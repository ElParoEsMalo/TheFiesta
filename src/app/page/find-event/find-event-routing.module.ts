import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindEventPage } from './find-event.page';

const routes: Routes = [
  {
    path: '',
    component: FindEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindEventPageRoutingModule {}
