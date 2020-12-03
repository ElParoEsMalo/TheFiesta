import { MenuController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { Usuario } from 'src/app/modules/newModules/usuario';
import { FirebaseServiceService } from 'src/app/servicios/firebaseServ/firebase-service.service';

@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.page.html",
  styleUrls: ["./user-home.page.scss"]
})
export class UserHomePage implements OnInit {
  user: Usuario;
  constructor(private firebaseService: FirebaseServiceService) { }
  ngOnInit() {
    this.firebaseService.executeTrigger();
    const ctrl: MenuController = new MenuController();
    ctrl.enable(true, "first");
    this.user = this.firebaseService.localUser;
  }

}
