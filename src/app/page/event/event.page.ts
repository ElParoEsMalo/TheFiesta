import { Event } from './../../core/models/evento';
import { Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  event:Event
  constructor(private router:Router) {
   }

  ngOnInit() {
  }

}
