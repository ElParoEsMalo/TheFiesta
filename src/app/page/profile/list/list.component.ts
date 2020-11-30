import { Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/servicios/nuevosServicios/firebase-service.service';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/core/models/evento';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  events: Array<string> = [];
  action: boolean = false;
  actions: Array<string>= []
  constructor(private firebaseServ:FirebaseServiceService,private router:Router) {
    
   }

  ngOnInit() {
    this.events = this.router.getCurrentNavigation().extras.state.data;
    this.action = this.router.getCurrentNavigation().extras.state.action;
    if (this.action) {
      this.actions = ['editar', 'borrar'];
    }
  }
  createEvent() {
    console.log("abir create event");
    const ruta=this.router.url.substring(0,this.router.url.lastIndexOf('/')+1) + 'create';
  
    this.router.navigateByUrl(ruta);
  }

}
