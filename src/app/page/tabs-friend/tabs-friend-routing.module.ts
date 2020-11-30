import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsFriendPage } from "./tabs-friend.page";

const routes: Routes = [
  {
    path: "",
    component: TabsFriendPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("../friends/friends.module").then(m => m.FriendsPageModule)
      },
      {
        path: "",
        loadChildren: () =>
          import("../friends/friends.module").then(m => m.FriendsPageModule)
      },
      {
        path: "find",
        loadChildren: () =>
          import("../find-friend/find-friend.module").then(
            m => m.FindFriendPageModule
          )
      },
      {
        path: "request",
        loadChildren: () =>
          import("../friend-request/friend-request.module").then(
            m => m.FriendRequestPageModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsFriendPageRoutingModule {}
