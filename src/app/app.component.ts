import { AuthService } from "./servicios/auth/auth.service";
import { Component } from "@angular/core";

import { Platform, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  navigate: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authServ: AuthService
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logOut() {
    let ctrl: MenuController = new MenuController();
    ctrl.enable(false, "first");
    this.authServ.logOut();
  }
  sideMenu() {
    this.navigate = [
      {
        title: "Events",
        url: "/tabs-page",
        icon: "planet"
      },
      {
        title: "Home",
        url: "/user-home",
        icon: "home"
      },
      {
        title: "Friends",
        url: "/tabs-friend",
        icon: "people"
      },
      {
        title: "Notification",
        url: "/user-home",
        icon: "mail"
      },
      {
        title: "Test",
        url: "/test",
        icon: "mail"
      }
    ];
  }
}
