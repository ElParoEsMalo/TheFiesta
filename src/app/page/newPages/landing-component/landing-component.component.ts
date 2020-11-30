import { Perfil } from "./../../../modules/newModules/usuario";
import { Usuario } from "src/app/modules/newModules/usuario";
import { SignUp } from "./../../../modules/newModules/login";

import { FirebaseServiceService } from "./../../../servicios/nuevosServicios/firebase-service.service";
import { Component, OnInit } from "@angular/core";
import { stringify } from "querystring";
import { Login } from "src/app/modules/newModules/login";

@Component({
  selector: "app-landing-component",
  templateUrl: "./landing-component.component.html",
  styleUrls: ["./landing-component.component.scss"],
})
export class LandingComponentComponent implements OnInit {
  model;
  action: string = "login";
  usuario:Usuario;
  constructor(private firebaseServ: FirebaseServiceService) {}

  ngOnInit() {
    this.model = new Login();
  }
  logIn(event: any) {
    if (event.action === "login") {
      this.firebaseServ.logIn(event.data).then((res) => {
        if (!res) {
          this.createProfile(event.data.user);
        }
      });
    }
    if (event.action === "signup") {
      this.firebaseServ.signUp(event.data).then((res) => {
        this.createProfile(event.data.user);
      });
    }
    if (event.action === "createProfile") {
      console.log(event);
      this.usuario.perfil=event.data;
      this.firebaseServ.uploadImage(this.usuario.idUsuario, event.file);
      this.firebaseServ.editProfile(this.usuario);
    }
  }
  change(value: string) {
    this.action = value;
    if (value === "login") {
      this.model = new Login();
    }
    if (value === "signup") {
      this.model = new SignUp();
    }
  }
  createProfile(user: string) {
    this.usuario=new Usuario(user);
    this.action = "createProfile";
    this.model = new Perfil();
  }
}
