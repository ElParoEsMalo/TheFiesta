import { FirebaseServiceService } from './../../../servicios/nuevosServicios/firebase-service.service';
import { OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/core/models/evento';

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"],
})
export class EventListComponent implements OnInit, OnChanges {
  @Input() events: Array<string>;
  @Input() actions: Array<string>;
  @Output() evento: EventEmitter<Event> = new EventEmitter();
  private event: Array<Event> = [];
  constructor(private firebaseServ: FirebaseServiceService) {}

  ngOnInit() {}
  ngOnChanges(): void {
    console.log(this.events, "cabio");
    if (this.events.length > 0) {
      this.firebaseServ.getEvents(this.events).then((res: Array<Event>) => {
        console.log(res);
        this.event = res;
      });
    }
  }
  emitir(event: Event) {
    this.evento.emit(event);
  }
}
