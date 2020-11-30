
import { consoleUtil } from "./../../modules/consoleUtil";
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { SignUp, Login } from 'src/app/modules/newModules/login';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}
  register(user: SignUp) {
    if (user.password !== user.cpassword) {
      consoleUtil.mostrarPorConsola("error al registrar");
    }
    consoleUtil.mostrarPorConsola(user.user);
    let email = user.user + "@firebase.com";
    return this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      user.password
    );
  }

  login(user: Login) {
    let email = user.user + "@firebase.com";
    return this.afAuth.auth.signInWithEmailAndPassword(email, user.password).then(res=>{
      sessionStorage.setItem("usuario",JSON.stringify(res.user.email));
    });
  }
  logOut() {
    return this.afAuth.auth.signOut().then(res=>{
      sessionStorage.removeItem("usuario");
    });
  }

  sendVerificationEmail() {
    if (!this.isUserVerified()) {
      return this.afAuth.auth.currentUser.sendEmailVerification();
    }
  }
  private isUserVerified() {
    return this.afAuth.auth.currentUser.emailVerified;
  }
  getCurrentUser(){
    consoleUtil.mostrarPorConsola(this.afAuth.auth.currentUser);
    return this.afAuth.auth.currentUser;
  }
  getAuth() {
    return this.afAuth.auth;
  }
  getCurrentUserUid() {
    return this.afAuth.auth.currentUser.uid;
  }
  getCurrentUserEmail() {
    return this.afAuth.auth.currentUser.email;
  }
  deleteUser() {
    if (this.afAuth.auth.currentUser.providerId == null) {
      console.log("This user doesnt exits already");
    }
    return this.afAuth.auth.currentUser.delete();
  }
}
