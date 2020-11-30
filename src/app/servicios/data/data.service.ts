import { UserServiceService } from 'src/app/servicios/userService/user-service.service';
import { isNullOrUndefined } from "util";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { User } from "src/app/modules/user";
import { Event } from "src/app/core/models/evento";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { UserData } from 'src/app/core/models/user-data';

@Injectable({
  providedIn: "root"
})
export class DataService {
  private user: AngularFirestoreCollection<User>;
  private Events: AngularFirestoreCollection<Event>;
  private PrivateEvents: AngularFirestoreCollection<Event>;
  private result: boolean = false;

  constructor(private afStoreSv: AngularFirestore) {
    this.Events = this.afStoreSv.collection<Event>("PublicEvent");
    this.PrivateEvents = this.afStoreSv.collection<Event>("PrivateEvent");
    this.user = this.afStoreSv.collection<User>("Users");
    //this.userLogData = {};
  }
  updateUser(user:User){
    this.user.doc(user.idUser).update(user)
  }

  async isMember(idUser: string) {
    this.result = false;
    await this.getUser(idUser).then(data => {
      console.log("is MENEN 1 :" + data);
      this.result = data != null;
    });

    return this.result;
  }

  /*
		async getTeacher(idUser: string): Promise<boolean> {
			return await new Promise((resolve, reject) => {
				this.teachers.doc<User>(idUser).valueChanges().subscribe((data) => {
					if (!isNullOrUndefined(data)) {
						console.log('data student', data.email);
						resolve(true);
					} else {
						resolve(false);
					}
				}, reject);
			});
		}
		*/

  async getUser(idUser: string): Promise<User> {
    return await new Promise((resolve, reject) => {
      this.user
        .doc<User>(idUser)
        .valueChanges()
        .subscribe(data => {
          if (!isNullOrUndefined(data)) {
            resolve(data);
          } else {
            resolve(null);
          }
        }, reject);
    });
  }
  addUserProfile(idUser: string, user: User) {
    if (this.isMember(idUser)) {
      this.afStoreSv
        .collection("userData")
        .doc(idUser)
        .set(Object.assign({}, new UserData()));
      return this.afStoreSv
        .collection("Users")
        .doc(idUser)
        .set(Object.assign({}, user));
    }
  }
  addPublicEvent(event: Event, idUser: string) {
    this.Events.add(Object.assign({}, event));
  }
  getEvent() {}
  addPrivateEvent(event: Event, idUser: string) {
    this.PrivateEvents.doc(idUser).set(event);
  }
  addFriend(idUser: string, user: User) {
    return this.afStoreSv
      .collection("Users")
      .doc(idUser)
      .collection(user.getFullName())
      .doc(user.idUser)
      .set(Object.assign({}, user));
  }

  /*
		async updateTeacherProfile(idUser: string, teacher: Teacher) {
			return this.afStoreSv
				.collection('user')
				.doc(idUser)
				.update(teacher)
				.then(function() {
					console.log('Document successfully updated!');
				});
		}
	*/
  /*
		async updateStudentProfile(idUser: string, student: Student) {
			return this.afStoreSv
				.collection('user')
				.doc(idUser)
				.update(student)
				.then(function() {
					console.log('Document successfully updated!');
				});
		}
		*/
  /*
		addTeacherId(idUser: string) {
			this.userLogData.idUser = idUser;
			return this.afStoreSv.collection('teachers').doc(idUser).set(this.userLogData);
		}
	*/
  /*
		addStudentId(idUser: string) {
			this.userLogData.idUser = idUser;
			return this.afStoreSv.collection('students').doc(idUser).set(this.userLogData);
		}
  */

  async getProfile(idUser: string) {
    console.log("id user: ",idUser);
    return await new Promise<User>((resolve, reject) => {
      this.user
        .doc(idUser)
        .valueChanges()
        .subscribe((data: User) => {
          console.log("data user", data);
          if (!isNullOrUndefined(data)) {
            resolve(data);
          }
        }, reject);
    });
  }
  /*
		addDemand(idUser: string, demand: Demand) {
			return this.afStoreSv.collection('demands').doc(idUser).set(demand);
		}
	*/
  /*
		getAllDemands() {
			return this.demands.snapshotChanges().pipe(
				map((actions) => {
					return actions.map((a) => {
						const data = a.payload.doc.data();
						const id = a.payload.doc.id;
						return { id, ...data };
					});
				})
			);
		}
	*/
  /*	
	addOffer(idUser: string, demand: Offer) {
		return this.afStoreSv.collection('demands').doc(idUser).set(demand);
	}
*/
  /*getAllOffers() {
		return this.offers.snapshotChanges().pipe(
			map((actions) => {
				return actions.map((a) => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);
	}
	*/
  /*
	updateDemand(demand:Demand){
		return this.demands.doc().update(demand);
	}
	*/
}
