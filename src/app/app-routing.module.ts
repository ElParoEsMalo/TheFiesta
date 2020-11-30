import { CreateElementComponent } from './page/newPages/create-element/create-element.component';
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
    path: "sign-up",
    loadChildren: () =>
      import("./page/sign-up/sign-up.module").then(m => m.SignUpPageModule),
    canActivate: [NotLoggedGuard]
  },
  {
    path: "login",
    loadChildren: () =>
      import("./page/login/login.module").then(m => m.LoginPageModule),
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
    path: "regist-user-profile",
    loadChildren: () =>
      import("./page/regist-user-profile/regist-user-profile.module").then(
        m => m.RegistUserProfilePageModule
      ),
    canActivate: [GuardPageGuard]
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
    path: "events",
    loadChildren: () =>
      import("./page/events/events.module").then(m => m.EventsPageModule),
    canActivate: [GuardPageGuard]
  },
  {
    path: "create-event",
    loadChildren: () =>
      import("./page/create-event/create-event.module").then(
        m => m.CreateEventPageModule
      )
    //,canActivate: [GuardPageGuard]
  },
  {
    path: "find-event",
    loadChildren: () =>
      import("./page/find-event/find-event.module").then(
        m => m.FindEventPageModule
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
  {
    path: "test",
    loadChildren: () =>
      import("./page/test/test.module").then(m => m.TestPageModule)
  },
  {
    path: "friends",
    loadChildren: () =>
      import("./page/friends/friends.module").then(m => m.FriendsPageModule),
    canActivate: [GuardPageGuard]
  },
  {
    path: "find-friend",
    loadChildren: () =>
      import("./page/find-friend/find-friend.module").then(
        m => m.FindFriendPageModule
      ),
    canActivate: [GuardPageGuard]
  },
  {
    path: "friend-request",
    loadChildren: () =>
      import("./page/friend-request/friend-request.module").then(
        m => m.FriendRequestPageModule
      ),
    canActivate: [GuardPageGuard]
  },
  {
    path: "tabs-friend",
    loadChildren: () =>
      import("./page/tabs-friend/tabs-friend.module").then(
        m => m.TabsFriendPageModule
      ),
    canActivate: [GuardPageGuard]
  },
  {
    path: 'modal-list',
    loadChildren: () => import('./page/modal-list/modal-list.module').then( m => m.ModalListPageModule)
  },
  {
    path: 'invitations',
    loadChildren: () => import('./page/invitations/invitations.module').then( m => m.InvitationsPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./page/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'modal-user-events',
    loadChildren: () => import('./page/modal-user-events/modal-user-events.module').then( m => m.ModalUserEventsPageModule)
  },
  {
    path: 'edit-event',
    loadChildren: () => import('./page/edit-event/edit-event.module').then( m => m.EditEventPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./page/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'list-event',
    loadChildren: () => import('./page/list-event/list-event.module').then( m => m.ListEventPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./page/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'preview-page',
    loadChildren: () => import('./page/preview-page/preview-page.module').then( m => m.PreviewPagePageModule)
  },
  {
    path: 'buy-ticekt',
    loadChildren: () => import('./page/buy-ticekt/buy-ticekt.module').then( m => m.BuyTicektPageModule)
  },
  {
    path: 'user-home',
    loadChildren: () => import('./page/newPages/user-home/user-home.module').then( m => m.UserHomePageModule)
  },
  {
    path: 'user-home',
    loadChildren: () => import('./page/newPages/user-home/user-home.module').then( m => m.UserHomePageModule)
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





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
