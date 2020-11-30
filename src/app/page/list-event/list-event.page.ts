import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { UserDataStorageService } from "src/app/servicios/userDataStorage/user-data-storage.service";
import { Event } from "src/app/core/models/evento";
import { ShowModalService } from "src/app/servicios/show-modal/show-modal.service";

@Component({
  selector: "app-list-event",
  templateUrl: "./list-event.page.html",
  styleUrls: ["./list-event.page.scss"],
})
export class ListEventPage implements OnInit {
  events: Event[] = [];
  constructor(
    private userDataStrgServ: UserDataStorageService,
    private router: Router
  ) {
    try {
      this.events = this.router.getCurrentNavigation().extras.state.user;
    } catch (error) {
      this.events = this.userDataStrgServ.userBuyEvent;
    }
  }

  ngOnInit() {}
}
