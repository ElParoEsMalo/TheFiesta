import { MapService } from 'src/app/servicios/map/map.service';
import { UserServiceService } from "src/app/servicios/userService/user-service.service";
import { Component, OnInit } from "@angular/core";
import { Event } from "../../core/models/evento";
import { DataService } from "../../servicios/data/data.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { EventServiceService } from 'src/app/servicios/event/event-service.service';
declare var google;
@Component({
  selector: "app-create-event",
  templateUrl: "./create-event.page.html",
  styleUrls: ["./create-event.page.scss"]
})
export class CreateEventPage implements OnInit {
  visibility: string[] = ["private", "public"];
  capacity: number;
  optionSelected: string;
  event: Event = new Event();

  ngOnInit() {
  }

  constructor(
   private eventServ: EventServiceService,
    private mapServ:MapService
  ) {}
  changeLocation(){
    this.mapServ.edit(this.event);
  }
  createEvent() {
    //this.event.owner = this.userServ.user.idUser;
    console.log(this.event);
    this.eventServ.addPublicEvent(this.event);
  }
}
