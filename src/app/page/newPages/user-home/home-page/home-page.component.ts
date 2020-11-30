import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/modules/newModules/usuario';
import { FirebaseServiceService } from 'src/app/servicios/nuevosServicios/firebase-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  user:Usuario;
  constructor(private firebaseService:FirebaseServiceService) { }
  ngOnInit() {
    const ctrl: MenuController = new MenuController();
    ctrl.enable(true, "first");
    this.user = this.firebaseService.localUser;
  }

}
