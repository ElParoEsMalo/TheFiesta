import { Router } from '@angular/router';
import { Perfil } from './../../../modules/newModules/usuario';
import { Usuario } from 'src/app/modules/newModules/usuario';
import { SignUp } from './../../../modules/newModules/login';
import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/modules/newModules/login';
import { FirebaseServiceService } from 'src/app/servicios/firebaseServ/firebase-service.service';

@Component({
  selector: 'app-landing-component',
  templateUrl: './landing-component.component.html',
  styleUrls: ['./landing-component.component.scss'],
})
export class LandingComponentComponent implements OnInit {
  model;
  action = 'login';
  usuario: Usuario;
  constructor(private firebaseServ: FirebaseServiceService,private router:Router) {}

  ngOnInit() {
    this.model = new Login();
  }
  logIn(event: any) {
    if (event.action === 'login') {
      this.firebaseServ.logIn(event.data).then((res) => {
        if (!res) {
          this.createProfile(event.data.user);
        }else{
          this.model=new Login();
          this.router.navigate(['userHome']);
        }
      });
    }
    if (event.action === 'signup') {
      this.model=new Login();
      this.firebaseServ.signUp(event.data).then((res) => {
        this.createProfile(event.data.user);
      });
    }
    if (event.action === 'createProfile') {
      console.log(event);
      console.log(this.model);
      this.usuario.perfil = event.data;
      this.firebaseServ.uploadImage(this.usuario.idUsuario, event.file).then(res => {
        this.usuario.perfil.imagen = res;
        this.firebaseServ.editProfile(this.usuario);
        this.model=new Login();
        this.router.navigateByUrl('/userHome');
      }).catch(res=>console.log('error'));
    }
  }
  change(value: string) {
    this.action = value;
    if (value === 'login') {
      this.model = new Login();
    }
    if (value === 'signup') {
      this.model = new SignUp();
    }
  }
  createProfile(user: string) {
    this.usuario = new Usuario(user);
    this.action = 'createProfile';
    this.model = new Perfil();
  }
}
