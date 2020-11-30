import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyTicektPage } from './buy-ticekt.page';

const routes: Routes = [
  {
    path: '',
    component: BuyTicektPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyTicektPageRoutingModule {}
