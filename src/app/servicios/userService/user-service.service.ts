import { UserData } from "./../../core/models/user-data";
import { DataService } from "src/app/servicios/data/data.service";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "src/app/modules/user";
import { map } from "rxjs/operators";
import { resolve } from "url";

@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  public users: User[];
  public user: User;
  public userData: UserData;
  constructor(private afStoreSv: AngularFirestore) {
    //this.user = this.dataService.actualUser;
    this.userData = new UserData();
  }
  addEvent(idEvent:string){
    this.userData.events.push(idEvent);
  }
  getUsers() {
    return this.afStoreSv
      .collection<User>("Users")
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            return { ...data };
          });
        })
      )
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }
  async sendFriendRequest(user: string) {
    let message = this.user.idUser;
    console.log("mensaje ", message, " to ", user);
    let temporalUser: UserData;
    await this.getUserData(user).subscribe(data => {
      console.log("datos del gubern ", data);
      if (temporalUser == null || temporalUser == undefined) {
        temporalUser = data || new UserData();
        if(temporalUser.request.indexOf(this.user.idUser)<0){
          temporalUser.request.push(this.user.idUser);
          this.updateObject(user, temporalUser);
        }
      }
    });
  }
  updateData() {
    this.addObject(this.user.idUser, this.userData);
  }
  sendNotification(user: string, message: string) {
    this.getUserData(user).subscribe(data => {
      data.notification.push(message);
      this.addObject(user, data);
    });
  }
  getUserData(id: string) {
    return this.afStoreSv
      .collection<UserData>("userData")
      .doc<UserData>(id)
      .valueChanges();
  }
  addTicket(idTicket){
    this.userData.events.push(idTicket);
    this.updateData();
  }
  addObject(id: string, object) {
    console.log(4, object);
    this.afStoreSv
      .collection("userData")
      .doc(id)
      .set(Object.assign({}, object));
  }
  updateObject(id: string, object) {
    console.log(4, object);
    this.afStoreSv
      .collection("userData")
      .doc(id)
      .update(Object.assign({}, object));
  }
}
