import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/modules/newModules/usuario';
import { FirebaseServiceService } from 'src/app/servicios/nuevosServicios/firebase-service.service';
import { ModalEventPage } from '../modal-event/modal-event.page';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {

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
