import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modules/newModules/usuario';
import { FirebaseServiceService } from 'src/app/servicios/firebaseServ/firebase-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @Input() usuario: Usuario;
  eventosPropios: Array<Event> = [];
  eventosAjenos: Array<Event> = [];
  showEdit = false;
  constructor(private firebaseServ: FirebaseServiceService, private router: Router) {}

  ngOnInit() {
    this.usuario = this.firebaseServ.localUser || null;
  }

 // ngOnChanges(): void {}
  editProfile() {
    this.router.navigate([this.router.url + '/edit']);
    this.showEdit = true;
  }
  logOut(){
    this.firebaseServ.logOut();
  }
  show(mark: boolean) {
    if (mark) {
      this.router.navigate([this.router.url + '/events'], {
        state: { data: this.usuario.eventosPropios, action: true },
      });
    } else {
      this.router.navigate([this.router.url + '/events'], {
        state: { data: this.usuario.eventosAjenos, action: false },
      });
    }
  }
}
