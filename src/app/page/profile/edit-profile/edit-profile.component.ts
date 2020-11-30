import { FirebaseServiceService } from 'src/app/servicios/nuevosServicios/firebase-service.service';
import { Usuario } from './../../../modules/newModules/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  usuario: Usuario;

  constructor(private firebaseServ:FirebaseServiceService) { }

  ngOnInit() {
    this.usuario = this.firebaseServ.localUser || null;
  }
  edit(event){
    this.usuario.perfil=event.data;
    console.log(this.usuario);
    if(event.file){
      this.firebaseServ.uploadImage(this.usuario.idUsuario,event.file,"profile");
    }
    this.firebaseServ.editProfile(this.usuario);
  }

}
