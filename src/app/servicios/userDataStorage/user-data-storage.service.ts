import { Event } from "./../../core/models/evento";
import { Injectable } from "@angular/core";
import { UserData } from "src/app/core/models/user-data";
import { AngularFirestore } from "@angular/fire/firestore";
import { UserServiceService } from "../userService/user-service.service";

@Injectable({
  providedIn: "root",
})
export class UserDataStorageService {
  actualUser: string;
  actualUserData: UserData;
  userEvent: Event[];
  userBuyEvent: Event[]=[];

  constructor(private afStoreSv: AngularFirestore) {}
  loadData(user: string) {
    this.actualUser = user;
    //Cargar UserData
    console.log("we aere young");
    this.getUserData(this.actualUser).subscribe((data) => {
      this.actualUserData = data;
      console.log(data.events);
      this.getUserBuyEvents(data.events);
    });
    //Cargar Los eventos en los que participa
    this.getUserEvents(this.actualUser).subscribe((data) => {
      console.log(data);
      this.userEvent = data;
    });
  }
  addFriend(user:string){
    let stop=true;
    this.getUserData(user).subscribe(data=>{
      if(stop){
        data.friends.push(this.actualUser);
        data.request.splice(data.request.indexOf(this.actualUser),1);
        this.afStoreSv
        .collection<UserData>("userData")
        .doc<UserData>(user).update(Object.assign({}, data));
        stop=false;
      }
      });
      this.actualUserData.friends.push(user);
      this.actualUserData.request.splice(this.actualUserData.request.indexOf(user),1);
      this.afStoreSv
      .collection<UserData>("userData")
      .doc<UserData>(this.actualUser).update(Object.assign({}, this.actualUserData));
  }
  getUserData(id: string) {
    return this.afStoreSv
      .collection<UserData>("userData")
      .doc<UserData>(id)
      .valueChanges();
  }
  updateUserData(id:string,user:UserData){
    this.afStoreSv.collection<UserData>("userData").doc<UserData>(id).update(user);
  }
  getUserBuyEvents(events:string[]){
    this.userBuyEvent=[];
    events.forEach(element => {
      console.log(element);
      this.afStoreSv.collection<Event>("PublicEvent").doc<Event>(element).valueChanges().subscribe(data=>{
        this.userBuyEvent.push(data);
      });
      
    });
  }
  getUserEvents(user:string) {
    return this.afStoreSv
      .collection<Event>(
        "PublicEvent",
        (ref) => ref.where("owner", "==", user)
      )
      .valueChanges();
  }

  private search(field: string, value: string) {
    return this.afStoreSv
      .collection<Event>(
        "PublicEvent",
        (ref) => ref.where(field, "==", value)
        //ref.where("visibility", "==", "public").where("owner", "==", "juan")
      )
      .valueChanges();
  }
}
