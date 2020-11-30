import { Component, OnInit } from "@angular/core";
import { UserServiceService } from "src/app/servicios/userService/user-service.service";
import { UserDataStorageService } from 'src/app/servicios/userDataStorage/user-data-storage.service';

@Component({
  selector: "app-friend-request",
  templateUrl: "./friend-request.page.html",
  styleUrls: ["./friend-request.page.scss"]
})
export class FriendRequestPage implements OnInit {
  notification: string[];
  constructor(private userDataStrgServ:UserDataStorageService) {
    this.notification = this.userDataStrgServ.actualUserData.request;
  }

  ngOnInit() {}
  addFriend(friend:string){
    this.userDataStrgServ.addFriend(friend);
  }
}
