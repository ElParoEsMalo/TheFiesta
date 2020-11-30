import { CreateElementComponent } from './../create-element/create-element.component';
import { ModalController } from '@ionic/angular';
import { FirebaseServiceService } from "./../../../servicios/nuevosServicios/firebase-service.service";
import { Component, OnInit } from "@angular/core";
import { delay } from "rxjs/operators";
import { ModalEventPage } from '../../modal-event/modal-event.page';

@Component({
  selector: "app-buscador",
  templateUrl: "./buscador.component.html",
  styleUrls: ["./buscador.component.scss"],
})
export class BuscadorComponent implements OnInit {
  campo: string = "name";
  eventos: Array<Event> = [];
  searchValue: string = "";
  limit: number = 5;
  stop: boolean = true;
  constructor(private firebaseServ: FirebaseServiceService,private modalCtrl:ModalController) {}

  ngOnInit() {}
  change(search: string) {
    console.log(search);
    this.searchValue = search;
    this.search();
  }
  logScrollEnd() {
    this.limit += 5;
    this.search();
  }
  async show(item: Event) {
    let myModalPage = await this.modalCtrl.create({
      component: ModalEventPage,
      componentProps: {
        event: item
      }
    });
    myModalPage
      .onDidDismiss()
      .then(personaD => {
        console.log("XD");
      })
      .catch();
    return await myModalPage.present();
  }
  search() {
    this.stop=true;
    console.log(this.campo);
    this.firebaseServ
      .searchEvents(this.searchValue, this.campo, this.limit)
      .then((res: Array<Event>) => {
        console.log(res);
        this.eventos = res;
        delay(10000);
        this.stop=false;
      });
  }
}
