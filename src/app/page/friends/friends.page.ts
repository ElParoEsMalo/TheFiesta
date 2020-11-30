import { UserData } from "./../../core/models/user-data";
import { resolve } from "url";
import { User } from "src/app/modules/user";
import { Component, OnInit } from "@angular/core";
import { UserServiceService } from "src/app/servicios/userService/user-service.service";
import { UserDataStorageService } from 'src/app/servicios/userDataStorage/user-data-storage.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: "app-friends",
  templateUrl: "./friends.page.html",
  styleUrls: ["./friends.page.scss"]
})
export class FriendsPage implements OnInit {
  private friends: string[] = [];
  constructor(private router:Router,private userDataStrgServ:UserDataStorageService ) {
    this.friends=this.userDataStrgServ.actualUserData.friends; 
  }
  seeProfile(user:string){
    this.userDataStrgServ.getUserData(user).subscribe(data=>{
      let navigationExtras: NavigationExtras = {
        state: {
          user: data,
          userName:user
        }
    };
      this.router.navigate(['user-profile'],navigationExtras);
    })
  }
  ngOnInit() {}
}
