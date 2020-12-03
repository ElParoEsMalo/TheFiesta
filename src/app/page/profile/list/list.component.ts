import { ShowModalService } from './../../../servicios/show-modal/show-modal.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/core/models/evento';
import { FirebaseServiceService } from 'src/app/servicios/firebaseServ/firebase-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  events: Array<string> = [];
  action = false;
  actions: Array<string> = [];
  constructor(private firebaseServ: FirebaseServiceService, private router: Router, private showModal: ShowModalService) {

   }

  ngOnInit() {
    this.events = this.router.getCurrentNavigation().extras.state.data;
    this.action = this.router.getCurrentNavigation().extras.state.action;
    if (this.action) {
      this.actions = ['create', 'trash'];
    }
    this.firebaseServ.removeDeletedEvents();
    }
  createEvent(event?: Event) {
    console.log('abir create event');
    const ruta = this.router.url.substring(0, this.router.url.lastIndexOf('/') + 1) + 'create';
    this.router.navigateByUrl(ruta, {state: {event: event || null}});
  }
  doAction(event: any) {
    console.log(event);
    if (event.action === 'detail') {
      this.showModal.showModal(event.event);
    }
    if (event.action === 'trash') {
      this.firebaseServ.removeEvent(event.event);
    }
    if (event.action === 'create') {
      this.createEvent(event.event);
    }
  }

}
