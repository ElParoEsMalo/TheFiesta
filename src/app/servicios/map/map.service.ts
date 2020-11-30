import { Router } from '@angular/router';
import { MapPage } from './../../page/map/map.page';
import { MapPageModule } from './../../page/map/map.module';
import { Event } from 'src/app/core/models/evento';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  events:Event[]=[];
  canEdit=false;
  constructor(private router:Router,private geolocation:Geolocation) { }
   edit(event:Event){
    console.log("show");
    console.log(event);
   this.events=[];
   this.events.push(event);
   this.canEdit=true;
   console.log(this.canEdit);
   this.router.navigateByUrl("/map");
  }
  
  show(event:Event[]){
    console.log("show");
    console.log(event);
    this.canEdit=false;
    this.events=event;
      console.log(this.canEdit);
    this.router.navigateByUrl("/map");

  }
  openMap(){
    this.router.navigateByUrl("/map");
  }
  getPosition(){
    this.geolocation.getCurrentPosition().then(d=>{
      console.log(d);
    });
  }
}
