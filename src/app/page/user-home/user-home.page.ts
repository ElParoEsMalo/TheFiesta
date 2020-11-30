import { MenuController } from "@ionic/angular";
import { UserServiceService } from "./../../servicios/userService/user-service.service";
import { User } from "src/app/modules/user";
import { Router, Routes } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { DataService } from "../../servicios/data/data.service";
import { UserDataStorageService } from 'src/app/servicios/userDataStorage/user-data-storage.service';
import { Usuario } from 'src/app/modules/newModules/usuario';
import { FirebaseServiceService } from 'src/app/servicios/nuevosServicios/firebase-service.service';

@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.page.html",
  styleUrls: ["./user-home.page.scss"]
})
export class UserHomePage implements OnInit {
  user:Usuario;
  constructor(private firebaseService:FirebaseServiceService) { }
  ngOnInit() {
    const ctrl: MenuController = new MenuController();
    ctrl.enable(true, "first");
    this.user = this.firebaseService.localUser;
  }

}
