import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/servicios/userService/user-service.service';
import { ShowModalService } from 'src/app/servicios/show-modal/show-modal.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.page.html',
  styleUrls: ['./invitations.page.scss'],
})
export class InvitationsPage implements OnInit {

  notification: string[];
  constructor(private userServ: UserServiceService,private showModal: ShowModalService) {
    console.log(userServ.userData.notification);
    this.notification = userServ.userData.notification;
  }

  ngOnInit() {}
  
  addFriend(friend:string){
    console.log(1,this.userServ.userData.notification);
    this.userServ.userData.friends.push(friend);
    console.log(2,this.userServ.userData.friends);
    this.userServ.updateData();
  }
}
