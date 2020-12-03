
import { MapPageModule } from './page/map/map.module';
import { ModalEventPageModule } from "./page/modal-event/modal-event.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import firebaseConfig from "./firebase";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AuthService } from "./servicios/auth/auth.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { EventPageModule } from './page/event/event.module';
import { PayPal } from '@ionic-native/paypal/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ModalEventPageModule,
    MapPageModule,
    EventPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    PayPal,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
