import { Conversation } from './../../modules/newModules/conversation';
import { Router } from "@angular/router";
import { User } from "src/app/modules/user";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { firestore } from "firebase";
import { Event } from "src/app/core/models/evento";
import { Chat, Usuario } from "src/app/modules/newModules/usuario";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { Login, SignUp } from "src/app/modules/newModules/login";
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class FirebaseServiceService {
  private user: AngularFirestoreCollection<User>;
  private events: AngularFirestoreCollection<Event>;
  private chat: AngularFirestoreCollection<Conversation>;
  public localUser:Usuario;
  public localChat:Array<Conversation>;
  private lastSearch: firestore.DocumentData;
  private lastQuery: firestore.Query;
  private susbscrition:Subscription;
  constructor(
    private afStoreSv: AngularFirestore,
    private firestoreStorage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = this.afStoreSv.collection<User>("Users");
    this.events = this.afStoreSv.collection<Event>("PublicEvent"); //Event
    this.chat=this.afStoreSv.collection<Conversation>('Chat');
    const users: Usuario = new Usuario("xd");
    this.localUser=new Usuario('');
    const items: Array<string> = [
      "8fxM0Z1en822Zgggqyu0",
      "CTW96xdTBrxZltkGu9ME",
    ];
    const cosa = this.getEvents(items).then((re) => {
      console.log(re);
    });
    this.searchEvents("", "name").then((re) => {
      console.log(re);
      this.searchEvents("", "name", re.length + 20).then((re) => {
        console.log(re);
      });
    });
    this.getEvent("8fxM0Z1en822Zgggqyu0");
  }

  logIn(user: Login) {
    let email = user.user + "@firebase.com";
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, user.password)
      .then((res) => {
        return this.getProfile(user.user).then((re:Usuario) => {
          if (re) {
            this.localUser = re;
            this.userObservate(user.user)
            this.router.navigateByUrl("/userHome");
          }
          this.localUser.idUsuario=email;
          return null;
        });
      });
  }

  signUp(user: SignUp) {
    if (user.password !== user.cpassword) {
      return null;
    }
    let email = user.user + "@firebase.com";
    return this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      user.password
    );
  }
  setSubscription(subscription:Subscription){
    this.susbscrition=subscription;
  }
  destroySubscription(){
    this.susbscrition.unsubscribe();
  }
  getProfile(idUser: string) {
    return this.user.ref
      .doc(idUser)
      .get()
      .then((res) => res.data());
  }
  editProfile(item: Usuario, id?: string) {
    console.log("edit",item);
    this.user
      .doc(id || item.idUsuario)
      .set(Object.assign({}, item))
      .then((res) => {
        console.log(res);
        this.localUser=item;
        this.router.navigate(["userHome"]);
      });
  }
  createEvent(item: Event,file:File) {
    this.events.add(Object.assign({},item)).then(res=>{
      this.uploadImage(res.id,file,'events').then(re=>{
        item.imagen=re;
        this.editEvent(item);
      })
    });
  }
  editEvent(item: Event, id?: string) {
    this.events.doc(id || item.id).set(Object.assign({}, item));
  }
  removeEvent(item: Event, id?: string) {
    this.events.doc(id || item.id).delete();
  }
  getEvents(items: Array<string>) {
    return this.events.ref
      .where(firestore.FieldPath.documentId(), "in", items)
      .get()
      .then((res) => {
        return res.docs.map((data) => data.data());
      });
  }

  loadConversation(idChat:string){
    return this.chat.doc(idChat).valueChanges();
  }
  sendMessage(id:string,convertasion:Conversation) {
    this.chat.doc(id).update(convertasion);
  }

  searchEvents(value: string, campo: string, limit?: number) {
    console.log(campo);
    return this.events.ref
      .orderBy(campo)
      .startAt(value)
      .endAt(value + "\uf8ff")
      .where("visibility", "==", "public")
      .limit(5 + limit || 5)
      .get()
      .then((res) => {
        return res.docs.map((data) => data.data());
      });
  }
  searchUsers(value: string, limit?: number) {
    return this.user.ref
      .orderBy('idUsuario')
      .startAt(value)
      .endAt(value + "\uf8ff")
      .limit(5 + limit || 5)
      .get()
      .then((res) => {
        return res.docs.map((data) => data.data());
      });
  }
  getEvent(idEvent: string) {
    return this.events.doc(idEvent).get();
  }
  createChat(idUser: string){  
    let conversation:Conversation=new Conversation();
    conversation.miembros.push(idUser,this.localUser.idUsuario);
    this.chat.add(Object.assign({},conversation)).then(res=>{
      console.log(res.id);
      let chat:Chat={nombre:idUser,chat:res.id};
      this.localUser.chats.push(chat);
      this.editProfile(this.localUser);
      this.getProfile(idUser).then((re:Usuario)=> { 
        console.log(re);
        chat.nombre=this.localUser.idUsuario;
        re.chats.push(chat);
        console.log(re);
        this.editProfile(re);
      })
    })
  }
  uploadPreview(file: File) {
    console.log("uploadProfileImage");
    let fileRef = this.firestoreStorage.ref(`preview/preview.jpg`);
    return fileRef.put(file).then(async function (snapshot) {
      console.log("Uploaded a blob or file!");
      return await snapshot.ref.getDownloadURL();
    });
  }
  uploadImage(id: string, file: File, type?: string) {
    console.log("uploadProfileImage");
    let fileRef = this.firestoreStorage.ref(
      `${type || "profile"}Images/${id}.jpg`
    );
    return fileRef.put(file).then(async function (snapshot) {
      console.log("Uploaded a blob or file!");
      return await snapshot.ref.getDownloadURL();
    });
  }
  /*
  createUser(item: User) {
    this.events.add(User);
  }
  editUser(item: Event, id?: string) {
    this.events.doc(id || item.id).set(Object.assign({}, item));
  }
  removeUser(item: Event, id?: string) {
    this.events.doc(id || item.id).delete();
  }*/

  buyTicket(event: Event) {
    this.localUser.eventosAjenos.push(event.id);
    this.editProfile(this.localUser);
    console.log(event);
    event.users.push(this.localUser.idUsuario);
    this.editEvent(event);
  }
  //trigger
  private userObservate(idUser:string) {
    this.user.doc(idUser).ref.onSnapshot(res=>{
      console.log('Observate: ',res.data());
      const user=res.data();
      this.localUser=Object.assign(this.localUser,user);
      console.log(this.localUser);
    })
  }
}
