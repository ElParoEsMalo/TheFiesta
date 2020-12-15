import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/core/models/evento';
import { MapService } from 'src/app/servicios/map/map.service';
import { Router } from '@angular/router';
import { FirebaseServiceService } from 'src/app/servicios/firebaseServ/firebase-service.service';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.scss'],
})
export class CreateEditEventComponent implements OnInit {
  visibility: string[] = ['private', 'public'];
  capacity: number;
  optionSelected: string;
  event: Event;
  file: File;
  constructor(private mapServ: MapService, private firebaseServ: FirebaseServiceService, private router: Router) { }

  ngOnInit() {
    this.event = this.router.getCurrentNavigation().extras.state.event || new Event();
  }

  changeListener($event): void {
    this.file = $event.target.files[0];
    this.firebaseServ.uploadPreview(this.file).then((res) => {
      this.event.imagen = res;
    });
    console.log(this.file);
  }
  show() {
    console.log(document.getElementById('file'));
    document.getElementById('file').click();
  }
  createEvent() {
    if(this.event.imagen.length !== 0 && this.event.latitude) {
      this.event.owner = this.firebaseServ.localUser.idUsuario;
      this.firebaseServ.createEvent(this.event, this.file);
    }
  }
  changeLocation(){
    this.mapServ.edit(this.event);
  }

}
