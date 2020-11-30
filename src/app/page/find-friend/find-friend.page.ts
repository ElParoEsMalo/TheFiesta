import { UserServiceService } from "src/app/servicios/userService/user-service.service";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/modules/user";

@Component({
  selector: "app-find-friend",
  templateUrl: "./find-friend.page.html",
  styleUrls: ["./find-friend.page.scss"]
})
export class FindFriendPage implements OnInit {
  private users: User[];
  constructor(private userServ: UserServiceService) {
    this.users = userServ.users;
  }

  ngOnInit() {}
  sendFriendRequest(user:string){
    this.userServ.sendFriendRequest(user);
  }
}
