import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserServiceService } from 'src/app/servicios/userService/user-service.service';

@Component({
  selector: 'app-tabs-friend',
  templateUrl: './tabs-friend.page.html',
  styleUrls: ['./tabs-friend.page.scss'],
})
export class TabsFriendPage implements OnInit {

  constructor(private alertCtrl: AlertController,private userServ:UserServiceService) { }

  ngOnInit() {
  }
  async presentPrompt() {
    let alert = await this.alertCtrl.create({
      header: 'Find User',
      cssClass:'warning',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send Request',
          handler: data => {
            console.log(data);
            this.userServ.sendFriendRequest(data.username);
          }
        }
      ]
    });
    alert.present();
  }

}
