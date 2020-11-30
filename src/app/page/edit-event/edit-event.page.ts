import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/servicios/map/map.service';
import { Event } from 'src/app/core/models/evento';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {
  location:Location;
  constructor(private mapServ:MapService,private router:Router) {
    }

  ngOnInit() {
  }
  changeLocation(event:Event){
    this.mapServ.edit(event);
  }
  goBack(){
    this.router.navigate(["list-event"]);
  }
  done(){
    //TO-DO
    //falta crear el servicio y modificar el evento
  }

}
