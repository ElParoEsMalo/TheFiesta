import { Errores } from './../../modules/errores';
import { NotificationService } from './../notification/notification.service';
import { Conversation } from './../../modules/newModules/conversation';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/user';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Event } from 'src/app/core/models/evento';
import { Chat, Usuario } from 'src/app/modules/newModules/usuario';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Login, SignUp } from 'src/app/modules/newModules/login';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceService {
  private user: AngularFirestoreCollection<User>;
  private events: AngularFirestoreCollection<Event>;
  private chat: AngularFirestoreCollection<Conversation>;
  public localUser: Usuario;
  public localChat: Array<Chat>;
  private susbscrition: Subscription;
  private triggers: Array<Subscription>;
  notification: AngularFirestoreCollection<Chat>;
  constructor(
    private afStoreSv: AngularFirestore,
    private firestoreStorage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private router: Router,
    private notificationServ: NotificationService
  ) {
    this.user = this.afStoreSv.collection<User>('Users');
    this.events = this.afStoreSv.collection<Event>('Event');
    this.chat = this.afStoreSv.collection<Conversation>('Chat');
    this.notification = this.afStoreSv.collection<Chat>('Notification');
    this.triggers = [];
    this.localUser = new Usuario('');
    this.localChat = [];
  }

  logIn(user: Login) {
    const email = user.user + '@firebase.com';
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, user.password);
  }
  logOut() {
    return this.afAuth.auth.signOut().then(res => {
      this.triggers.forEach(tri => {
        tri.unsubscribe();
      });
      this.router.navigate(['']);
    });
  }
  signUp(user: SignUp) {
    const email = user.user + '@firebase.com';
    if (user.cpassword !== user.password) {
      return this.promiseError('Error password and confirmation password is not the same');
    }
    return this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      user.password
    );
  }
  setSubscription(subscription: Subscription) {
    this.susbscrition = subscription;
  }
  destroySubscription() {
    this.susbscrition.unsubscribe();
  }
  getProfile(idUser: string) {
    return this.user.ref
      .doc(idUser)
      .get()
      .then((res) => res.data());
  }
  editProfile(item: Usuario, id?: string) {
    console.log('edit', item);
    this.user
      .doc(id || item.idUsuario)
      .set(Object.assign({}, item))
      .then((res) => {
        console.log(res);
        this.localUser = item;
      });
  }
  createEvent(item: Event, file: File) {
    console.log(item);
    this.events.add(Object.assign({}, item)).then(res => {
      this.uploadImage(res.id, file, 'events').then((re: any) => {
        item.imagen = re;
        item.id = res.id;
        this.editEvent(item).then(() => {
          this.localUser.eventosPropios.push(item.id);
          this.editProfile(this.localUser);
        });
      }).catch((err) => this.promiseError(err));
    });
  }
  editEvent(item: Event, id?: string) {
    return this.events.doc(id || item.id).set(Object.assign({}, item));
  }
  removeEvent(item: Event, id?: string) {
    const array = this.localUser.eventosPropios;
    this.localUser.eventosPropios = array.filter(res => res !== item.id || id);
    this.firestoreStorage.ref(
      `eventsImages/${item.id}.jpg`
    ).delete();
    this.editProfile(this.localUser);
    this.events.doc(id || item.id).delete();
  }
  getEvents(items: Array<string>) {
    return this.events.ref
      .where(firestore.FieldPath.documentId(), 'in', items)
      .get()
      .then((res) => {
        return res.docs.map((data) => data.data());
      });
  }
  getPublicEvents() {
    return this.events.ref
    .where('visibility', '==', 'public')
    .get().then(res => res.docs.map((data) => data.data()));
  }
  removeDeletedEvents() {
    this.dropEmpty(this.localUser.eventosAjenos).then((res: Array<string>) => {
      console.log(res);
      this.localUser.eventosAjenos = res || [];
    });
  }
  dropEmpty(items: Array<string>) {
    if (items.length > 0) {
      return this.events.ref
      .where(firestore.FieldPath.documentId(), 'in', items)
      .get()
      .then((res) => res.docs.map((data) => data.data().id));
    } else {
      return new Promise<any>(resolve => {
        const array: Array<string> = [];
        resolve(array);
      });
    }

  }

  loadConversation(idChat: string) {
    return this.chat.doc(idChat).valueChanges();
  }
  sendMessage(id: string, convertasion: Conversation) {
    const message = convertasion.mensajes[convertasion.mensajes.length - 1].mensaje;
    convertasion.miembros.forEach(conv => {
      if (conv !== this.localUser.idUsuario) {
        this.notify(conv, message, id);
      }
    });
    return this.chat.doc(id).update(convertasion);
  }
  openChat(idChat: string) {
    this.notification.doc(this.localUser.idUsuario).collection('notification').doc(idChat)
    .update({lastMessage: '', newMessage: 0, inline: true});
  }
  closeChat(idChat: string) {
    this.notification.doc(this.localUser.idUsuario).collection('notification').doc(idChat)
    .update({inline: false});
  }
  private notify(idUser: string, message: string, idChat: string) {
    const chat = this.localChat.filter(res => res.idChat === idChat)[0];
    this.getNotification(idChat, idUser).then((not: Chat) => {
      const notify = not;
      if (!not.inline) {
        this.notification.doc(idUser).collection('notification').doc(idChat).update({lastMessage: message, newMessage: not.newMessage + 1});
      }
    });
  }

  searchEvents(value: string, campo: string, limit?: number) {
    console.log(campo);
    return this.events.ref
      .orderBy(campo)
      .startAt(value)
      .endAt(value + '\uf8ff')
      .where('visibility', '==', 'public')
      .limit(5 + limit || 5)
      .get()
      .then((res) => {
        return res.docs.map((data) => data.data().id);
      });
  }
  searchUsers(value: string, limit?: number) {
    return this.user.ref
      .orderBy('idUsuario')
      .startAt(value)
      .endAt(value + '\uf8ff')
      .limit(30 + limit || 30)
      .get()
      .then((res) => {
        return res.docs.map((data) => data.data());
      });
  }
  getEvent(idEvent: string) {
    return this.events.doc(idEvent).get();
  }
  createChat(idUser: string) {
    const conversation: Conversation = new Conversation();
    conversation.miembros.push(idUser, this.localUser.idUsuario);
    this.chat.add(Object.assign({}, conversation)).then(res => {
      this.notification.doc(idUser).collection('notification').doc(res.id)
      .set({idChat: res.id, nombre: this.localUser.idUsuario, lastMessage: '', newMessage: 0, inline: false});

      this.notification.doc(this.localUser.idUsuario).collection('notification').doc(res.id)
      .set({idChat: res.id, nombre: idUser, lastMessage: '', newMessage: 0, inline: false});
    });
  }
  private getNotification(idChat: string, idUser: string) {
    return this.notification.doc(idUser).collection('notification').doc(idChat).ref.get().then(not => not.data());
  }
  uploadPreview(file: File) {
    const fileRef = this.firestoreStorage.ref(`preview/${this.localUser.idUsuario}preview.jpg`);
    return fileRef.put(file).then(async (snapshot) => {
      this.notificationServ.presentToast('Imagen Cargada');
      return await snapshot.ref.getDownloadURL();
    }).catch(res => console.log(res));
  }
  uploadImage(id: string, file: File, type?: string) {
    const fileRef = this.firestoreStorage.ref(
      `${type || 'profile'}Images/${id}.jpg`
    );
    if (!file) {
      return this.promiseError('Error no image selected');
    }
    return fileRef.put(file).then(async (snapshot) => {
      this.notificationServ.presentToast('Imagen Cargada');
      return await snapshot.ref.getDownloadURL();
    });
  }
  buyTicket(event: Event) {
    console.log(this.localUser);
    this.localUser.eventosAjenos.push(event.id);
    this.editProfile(this.localUser);
    console.log(event);
    event.users.push(this.localUser.idUsuario);
    this.editEvent(event);
  }
  // trigger
  executeTrigger() {
    this.userObservate(this.localUser.idUsuario);
    this.chatObservate();
  }
  private userObservate(idUser: string) {
    this.triggers.push(this.user.doc(idUser).snapshotChanges().subscribe(res => {
      const user = res.payload.data();
      this.localUser = Object.assign(this.localUser, user);
    }));
  }
  private chatObservate() {
    this.triggers.push(this.notification.doc(this.localUser.idUsuario).collection('notification')
    .valueChanges().subscribe((res: any) => {
      console.log('chat', res);
      this.localChat = res;
    }));
  }
  private promiseError(message: string) {
    return new Promise((resolve, reject) => {
      reject({message});
   });
  }
}
