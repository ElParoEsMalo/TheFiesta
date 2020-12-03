
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { GuardPageGuard } from "./guard/guard-page.guard";
import { NotLoggedGuard } from "./guard/not-logged.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./page/home/home.module").then(m => m.HomePageModule),
    canActivate: [NotLoggedGuard]
  },
  {
    path: "userHome",
    loadChildren: () =>
      import("./page/tabs-page/tabs-page.module").then(
        m => m.TabsPagePageModule
      ),
    //canActivate: [GuardPageGuard]
  },
  {
    path: "tabs-page",
    loadChildren: () =>
      import("./page/tabs-page/tabs-page.module").then(
        m => m.TabsPagePageModule
      ),
    canActivate: [GuardPageGuard]
  },
  {
    path: "modal-event",
    loadChildren: () =>
      import("./page/modal-event/modal-event.module").then(
        m => m.ModalEventPageModule
      ),
    canActivate: [GuardPageGuard]
  },
    //canActivate: [GuardPageGuard]
    {
    path: 'event',
    loadChildren: () => import('./page/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./page/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'buy-ticekt',
    loadChildren: () => import('./page/buy-ticekt/buy-ticekt.module').then( m => m.BuyTicektPageModule)
  },
  {
    path: 'user-home',
    loadChildren: () => import('./page/user-home/user-home.module').then( m => m.UserHomePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./page/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./page/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'buscador',
    loadChildren: () => import('./page/buscador/buscador.module').then( m => m.BuscadorPageModule)
  },
  {
    path: 'explore',
    loadChildren: () => import('./page/explore/explore.module').then( m => m.ExplorePageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
