import { UserServiceService } from "src/app/servicios/userService/user-service.service";
import { Router, NavigationExtras } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { User } from "../../modules/user";
import { DataService } from "../../servicios/data/data.service";
import { AuthService } from "../../servicios/auth/auth.service";

@Component({
  selector: "app-regist-user-profile",
  templateUrl: "./regist-user-profile.page.html",
  styleUrls: ["./regist-user-profile.page.scss"]
})
export class RegistUserProfilePage implements OnInit {
  private user: User = new User();
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private userServ: UserServiceService
  ) {}

  ngOnInit() {}
  createProfile() {
    var user: string = this.authService.getCurrentUserEmail().split("@")[0];
    this.user.idUser = user;
    this.dataService.addUserProfile(user, this.user);
    this.userServ.user = this.user;
    this.router.navigate(["/user-home"]);
  }
}
