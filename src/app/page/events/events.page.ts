import { ShowModalService } from "./../../servicios/show-modal/show-modal.service";
import { ModalEventPage } from "./../modal-event/modal-event.page";
import { ModalController } from "@ionic/angular";
import { Event } from "src/app/core/models/evento";
import { EventServiceService } from "./../../servicios/event/event-service.service";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/servicios/data/data.service";

@Component({
  selector: "app-events",
  templateUrl: "./events.page.html",
  styleUrls: ["./events.page.scss"]
})
export class EventsPage implements OnInit {
  show = false;
  events: Event[];
  constructor(
    private eventServ: EventServiceService
  ) {
    this.eventServ.getAllEvents().subscribe(data => {
      eventServ.UserEvents = data;
      this.events = eventServ.getUserEvents();
      this.show=true;
    });
  }

  ngOnInit() {}
}
