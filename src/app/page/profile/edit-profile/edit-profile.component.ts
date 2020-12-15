import { Usuario } from './../../../modules/newModules/usuario';
import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from 'src/app/servicios/firebaseServ/firebase-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  usuario: Usuario;

  constructor(private firebaseServ: FirebaseServiceService) { }

  ngOnInit() {
    this.usuario = this.firebaseServ.localUser || null;
  }
  edit(event) {
    this.usuario.perfil = event.data;
    console.log(this.usuario,event.file);
    if (event.file) {
      this.firebaseServ.uploadImage(this.usuario.idUsuario, event.file, 'profile').then((res: any) => {
        this.usuario.perfil.imagen = res;
        this.firebaseServ.editProfile(this.usuario);
      });
    } else {
      this.firebaseServ.editProfile(this.usuario);
    }
  }

}
