
import { User } from 'src/app/modules/user';
import { FirebaseServiceService } from './../../servicios/nuevosServicios/firebase-service.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ShowModalService } from "src/app/servicios/show-modal/show-modal.service";
import { EventServiceService } from "src/app/servicios/event/event-service.service";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { MapService } from 'src/app/servicios/map/map.service';
import { Event } from 'src/app/core/models/evento';
import { UserDataStorageService } from 'src/app/servicios/userDataStorage/user-data-storage.service';
import { AlertController } from '@ionic/angular';
import { UserServiceService } from 'src/app/servicios/userService/user-service.service';
import { Subject } from 'rxjs';
import { ValueTransformer } from '@angular/compiler/src/util';
import { Usuario } from 'src/app/modules/newModules/usuario';
import { Login } from 'src/app/modules/newModules/login';
declare var google;
@Component({
  selector: "app-test",
  templateUrl: "./test.page.html",
  styleUrls: ["./test.page.scss"]
})
export class TestPage implements OnInit {
  location:Location;
  mostrar=false;
  events:Event[]=[];
  searchB="";
  option:string="name";
  items: string[] = [];
  termina = true;
  busqueda;
  user:User;
  constructor(
/*    private geolocation: Geolocation,
    private showModal: ShowModalService,
    private mapServ:MapService,
    private userDataStorService:UserDataStorageService,
    private alertCtrl:AlertController,
    private userServ:UserServiceService,*/
    private eventServ:EventServiceService,
    private newServ:FirebaseServiceService
  ) {
    this.cargarVector();
    this.user=new User();
    const login:Login=new Login();
   // this.newServ.logIn(login);
    //this.eventServ.paPlobal();
   // this.mapServ.getPosition();

  }
  change(event): void {
    console.log(event);
    this.eventServ.searchEventTwo(event).valueChanges().subscribe(ref=>{
      this.events=ref;
    })
  }
 /* async presentPrompt() {
    let alert = await this.alertCtrl.create({
      header: 'Find User',
      cssClass:'warning',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send Request',
          handler: data => {
            console.log(data);
            this.userServ.sendFriendRequest(data.username);
          }
        }
      ]
    });
    alert.present();
  }
  loadUserFriends(user: string) {
    //this.showModal.showUsersEvent(user);
  }
  goBack(){
    this.location.back();
  }
  edit(){
    let event:Event=new Event(null,null,10,20,null,["",""],"Party Up",6,6);
    console.log(event.name);
    this.mapServ.edit(event)
  }
  show(){
    for (let i = 0; i < 10; i++) {
      let event:Event=new Event(null,null,(2*i+1),(3*i+2),null,["",""],"Party Up"+i,(6*i),-(6*i));
      this.mapServ.events.push(event);
    }
    this.mapServ.show(this.mapServ.events);
  }*/
ngOnInit() {

}
search(){
  let value;
  let valueF;
  if(this.option=="name"|| this.option=="owner"){
    value=this.searchB
    valueF=value+"\uf8ff";
  }else{
    value=Number(this.searchB);
    valueF=10000;
  }
      this.eventServ.searchEvent(value,valueF,this.option).valueChanges().subscribe(data=>{
        console.log(data)
        this.events=data;
      })
}
private cargarVector() {
  for (let i: number = 0; i < 20; i++) {
    this.items.push(i.toString());
  }
}

doInfinite(event: any) {
  console.log("comenzado operacion asincrona");
  //Vamos a meter mas elementos en la lista
  setTimeout(() => {
    this.eventServ.increaseLimit(2);
    this.search();
    console.log("terminando operacion asincrona");
    //terminar el scroll
    event.target.complete();
    if (this.items.length > 999){
      event.target.disable();
      this.termina = false;
      
    }
}, 500);
  console.log("fuera del settimeout no espero a nadie");

}
}
