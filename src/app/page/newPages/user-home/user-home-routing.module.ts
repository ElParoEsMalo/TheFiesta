import { BuscadorComponent } from "./../buscador/buscador.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserHomePage } from "./user-home.page";
import { PerfilComponent } from "./perfil/perfil.component";

const routes: Routes = [
  {
    path: "",
    component: UserHomePage,
    children: [
      {
        path: "perfil",
        component:PerfilComponent
      },
      {
        path: "inicio",
        component: HomePageComponent,
      },
      {
        path: "buscador",
        component: BuscadorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserHomePageRoutingModule {}
