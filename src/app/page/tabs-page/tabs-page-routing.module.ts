
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPagePage } from './tabs-page.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPagePage,
    children: [
    { path: 'buscador',
    loadChildren: () => import('../buscador/buscador.module').then( m => m.BuscadorPageModule)},
    { path: 'chat',
    loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)},
    { path: 'perfil',
    loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)},
    { path: 'home',
    loadChildren: () => import('../user-home/user-home.module').then( m => m.UserHomePageModule)},
    { path: '',
    loadChildren: () => import('../user-home/user-home.module').then( m => m.UserHomePageModule)},
    { path: 'mapa',
    loadChildren: () => import('../explore/explore.module').then( m => m.ExplorePageModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPagePageRoutingModule {}
