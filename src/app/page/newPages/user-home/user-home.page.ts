import { Usuario } from './../../../modules/newModules/usuario';
import { FirebaseServiceService } from './../../../servicios/nuevosServicios/firebase-service.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
  tabs:any;
  constructor() { }

  ngOnInit() {
    this.tabs=[{
      icon: 'person-circle',
      name: 'perfil',
      title: 'perfil'
    },
    {
      icon: 'search',
      name: 'buscador',
      title: 'buscar'
    },
    {
      icon: 'home',
      name: '',
      title: 'inicio'
    }]
  }
}
