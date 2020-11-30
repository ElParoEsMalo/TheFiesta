import { FirebaseServiceService } from "./../../../../servicios/nuevosServicios/firebase-service.service";
import { OnChanges, SimpleChanges } from "@angular/core";
import { Component, Input, OnInit } from "@angular/core";
import { Event } from "src/app/core/models/evento";
import { Usuario } from "src/app/modules/newModules/usuario";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.scss"],
})
export class PerfilComponent implements OnInit, OnChanges {
  @Input() usuario: Usuario;
  eventosPropios: Array<Event>;
  eventosAjenos: Array<Event>;
  showEdit:boolean=false;
  constructor(private firebaseServ: FirebaseServiceService) {}

  ngOnInit() {
    this.usuario = this.firebaseServ.localUser || null;
    this.firebaseServ
      .getEvents(this.usuario.eventosPropios)
      .then((res: Array<Event>) => {
        this.eventosPropios = res;
      });
    this.firebaseServ
      .getEvents(this.usuario.eventosAjenos)
      .then((res: Array<Event>) => {
        this.eventosAjenos = res;
      });
  }

  ngOnChanges(): void {}
  editProfile(){
    this.showEdit=true;
  }
}
