import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscadorComponent } from '../newPages/buscador/buscador.component';

import { TestPage } from './test.page';

const routes: Routes = [
  {
    path: '',
    component: TestPage,
  },
  {
    path: 'buscador',
    component: BuscadorComponent
  },
  {path:'userHome',loadChildren: () => import('../newPages/user-home/user-home.module').then( m => m.UserHomePageModule)}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestPageRoutingModule {}
