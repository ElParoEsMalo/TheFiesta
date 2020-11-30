import { ModalUserEventsPage } from './../../page/modal-user-events/modal-user-events.page';
import { Event } from "./../../core/models/evento";
import { ModalController } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { ModalEventPage } from "src/app/page/modal-event/modal-event.page";

@Injectable({
  providedIn: "root"
})
export class ShowModalService {
  constructor(private modalCtrl: ModalController) {}
  hola(item) {
    console.log("jaja");
  }
  async showModal(item: Event) {
    //crear el modal
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
}
