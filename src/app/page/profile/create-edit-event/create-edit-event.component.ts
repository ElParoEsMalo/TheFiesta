import { FirebaseServiceService } from './../../../servicios/nuevosServicios/firebase-service.service';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/core/models/evento';
import { MapService } from 'src/app/servicios/map/map.service';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.scss'],
})
export class CreateEditEventComponent implements OnInit {
  visibility: string[] = ["private", "public"];
  capacity: number;
  optionSelected: string;
  event: Event = new Event();
  file: File;
  constructor(private mapServ:MapService,private firebaseServ:FirebaseServiceService) { }

  ngOnInit() {}

  changeListener($event): void {
    this.file = $event.target.files[0];
    this.firebaseServ.uploadPreview(this.file).then((res) => {
      this.event.imagen = res;
    });
    console.log(this.file);
  }
  show() {
    console.log(document.getElementById("file"));
    document.getElementById("file").click();
  }
  createEvent() {
    this.event.owner=this.firebaseServ.localUser.idUsuario;
    this.firebaseServ.createEvent(this.event,this.file);
  }
  changeLocation(){
    this.mapServ.edit(this.event);
  }

}
