import { UserServiceService } from 'src/app/servicios/userService/user-service.service';
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../servicios/auth/auth.service";
import { RouterLink, Router, NavigationExtras } from "@angular/router";
import { DataService } from "../../servicios/data/data.service";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { UserDataStorageService } from 'src/app/servicios/userDataStorage/user-data-storage.service';
import { Login } from 'src/app/modules/newModules/login';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  grupoControl: FormGroup;
  public user: Login = new Login();
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private userServ:UserServiceService,
    private userDataStrgServ:UserDataStorageService
  ) {
    this.crearGrupoControl();
  }

  ngOnInit() {}
  login() {
    console.log("el usuario "+ this.user.user);
    this.userDataStrgServ.loadData(this.user.user)
    this.authService.login(this.user).then(() => {
      this.isMember();
    });
  }
  isMember() {
    var idUser = this.user.user;
    idUser = idUser.toLowerCase();
    console.log("datos :" + idUser);
    this.dataService.isMember(idUser).then(data => {
      if (!data) {
        this.router.navigateByUrl("/regist-user-profile");
      } else {
        this.dataService.getProfile(idUser).then(data => {
          console.log(data);
          this.userServ.user = data;
          this.router.navigate(["/user-home"]);
        });
      }
    });
  }
  private crearGrupoControl() {
    this.grupoControl = new FormGroup({
      longitudMinima: new FormControl("", Validators.minLength(3)),
      letraNumeros: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(18),
          Validators.pattern("[a-zA-Z0-9]{4,18}")
        ])
      ),
      regularUno: new FormControl(Validators.pattern("hola[oa]")),
      regularTres: new FormControl("", Validators.pattern("hola[ao]{3}"))
    });
  }
}
