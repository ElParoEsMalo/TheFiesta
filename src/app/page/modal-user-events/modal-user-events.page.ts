import { Event } from "src/app/core/models/evento";
import { Component, OnInit } from "@angular/core";
import { EventServiceService } from "src/app/servicios/event/event-service.service";
import { ShowModalService } from "src/app/servicios/show-modal/show-modal.service";
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-modal-user-events",
  templateUrl: "./modal-user-events.page.html",
  styleUrls: ["./modal-user-events.page.scss"]
})
export class ModalUserEventsPage implements OnInit {
  show = false;
  userName = "";
  events: Event[] = [];
  private owner: boolean = false;
  constructor(
    private modalCtrl: ModalController,
    private params: NavParams,
    private eventServ: EventServiceService,
    private showModal: ShowModalService
  ) {
    this.userName = this.params.get("user");
    this.owner=this.userName==this.eventServ.getUser().idUser;
    console.log(this.userName);
    this.eventServ.getUsersEvents(this.userName).subscribe(data => {
      console.log(data.events);
      data.events.forEach(element => {
        console.log("f");
        this.eventServ.getEvent(element).subscribe(even => {
          console.log(even);
          this.events.push(even);
          if (this.events.length >= data.events.length) {
            this.show = true;
            console.log("y ya");
          }
        });
      });
    });
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}
}
