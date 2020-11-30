import { UserServiceService } from "src/app/servicios/userService/user-service.service";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Event } from "src/app/core/models/evento";
import { map } from "rxjs/operators";
import { DataService } from "../data/data.service";
import { UserDataStorageService } from '../userDataStorage/user-data-storage.service';
import { UserData } from 'src/app/core/models/user-data';
@Injectable({
  providedIn: "root"
})
export class EventServiceService {
  public UserEvents: Event[];
  public allEvents: Event[];
  public selectedEvent: Event;
  private events: AngularFirestoreCollection<Event>;
  private eventLimit:number=20;
  constructor(
    private afStoreSv: AngularFirestore,
    private userServ: UserServiceService,
    private userDataServ:UserDataStorageService
  ) {
    this.events = this.afStoreSv.collection<Event>("PublicEvent");
  }
  increaseLimit(amount:number){
    this.eventLimit+=amount;
  }
  private getEvents() {
    return this.afStoreSv.collection<Event>(
      "PublicEvent",
      ref => ref.where("visibility", "==", "public")
      //ref.where("visibility", "==", "public").where("owner", "==", "juan")
    );
  }
  getEvent(name: string) {
    return this.afStoreSv
      .collection<Event>("PublicEvent")
      .doc<Event>(name).valueChanges();
  }
  searchEvent(start,end,type){
    return this.afStoreSv.collection<Event>(
      "PublicEvent",
      ref => ref.orderBy(type).startAt(start).endAt(end).limit(this.eventLimit)
      //ref.where("visibility", "==", "public").where("owner", "==", "juan")
    );
  }
  searchEventTwo(start){
    return this.afStoreSv.collection<Event>(
      "PublicEvent",
      ref => ref.orderBy("name").startAt(start).endAt(start+"\uf8ff")
      //ref.where("visibility", "==", "public").where("owner", "==", "juan")
    );
  }
  getUsersEvents(idUser: string) {
    console.log("usuario actual: ", idUser);
    console.log(this.userServ.user);
    return this.userServ.getUserData(idUser);
  }
  getUserEvents() {
    console.log("usuario actual: ", this.userServ.user);
    var result = [];
    console.log(this.userServ.user);
    this.userServ.userData.events.forEach(elemente => {
      result.push(
        this.UserEvents.filter(a => {
          return a.id.trim() == elemente.trim();
        })[0]
      );
    });
    console.log("los resulatdos son: ", result);
    return result;
  }
  getUser() {
    return this.userServ.user;
  }
  paPlobal(){  
   //Las dos formas de insertar el id a la hora de crear
    for (let index = 0; index < 20; index++) {
      console.log("fuera ",this.afStoreSv.createId());
      this.afStoreSv.collection(`/test`).add({nombre:'tertul'}).then(data=>{
        this.afStoreSv.doc(data.path).update({nombre:'tertul',id:data.id});
      });
      let paco=this.afStoreSv.createId();
      this.afStoreSv.doc(`/test2/${paco}`).set({nombre:'tertul',id:paco});
    }
  }
  addPublicEvent(event: Event) {
    event.owner=this.getUser().idUser;
    event.id=this.afStoreSv.createId();
    this.afStoreSv.doc(`/PublicEvent/${event.id}`).set(Object.assign({}, event));
    //this.events.add(Object.assign({}, event));
    //this.getAllEvents();
    console.log("we are yuong");
  }
  buyTicket(event: Event) {
    var user = this.userServ.user;
     let userData:UserData;
     let stop:boolean=false;
    console.log(user);
    console.log(event);
    this.userDataServ.getUserData(user.idUser).subscribe(data=>{
      if(!stop){
        userData=data;
        userData.events.push(event.id);
        this.userDataServ.updateUserData(user.idUser,userData);
        stop=true;
      }
    });
    event.users.push(user.idUser);
    this.userServ.addTicket(event.id);
    this.afStoreSv
      .collection<Event>("PublicEvent")
      .doc(event.id)
      .update(event);
  }
  getAllEvents() {
    return this.getEvents()
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            return { ...data };
          });
        })
      );
  }
}
