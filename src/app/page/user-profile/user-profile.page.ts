import { Router, NavigationExtras } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ShowModalService } from "src/app/servicios/show-modal/show-modal.service";
import { UserData } from "src/app/core/models/user-data";
import { UserDataStorageService } from 'src/app/servicios/userDataStorage/user-data-storage.service';

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.page.html",
  styleUrls: ["./user-profile.page.scss"],
})
export class UserProfilePage implements OnInit {
  private userData: UserData;
  private userName: string;
  constructor(private showModal: ShowModalService, private router: Router,private userDataStrgServ:UserDataStorageService) {
    this.userData = this.router.getCurrentNavigation().extras.state.user;
    this.userName = this.router.getCurrentNavigation().extras.state.userName;
    
  }
  loadUserFriends(user: string) {
    //this.showModal.showUsersEvent(user);
  }
  seeEvents(){
    this.userDataStrgServ.getUserEvents(this.userName).subscribe(data=>{
      let navigationExtras: NavigationExtras = {
        state: {
          user: data
        }
    };
      this.router.navigate(['tabs-page/home'],navigationExtras);
    })
  }
  ngOnInit() {}
}
