import { Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/servicios/nuevosServicios/firebase-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  tabs;
  opcion:string;
  constructor( private firebaseServ:FirebaseServiceService,private router:Router) { }
  
  ngOnInit() {
    this.opcion = 'list';
    this.tabs=[{
      icon: 'people-circle-outline',
      name: 'list',
      title: 'perfil'
    },
    {
      icon: 'search',
      name: 'buscar',
      title: 'buscar'
    }];
    //this.firebaseServ.getChat();
  }
  show(nombre:string){
    console.log(nombre);
    this.opcion=nombre;
  }
}
