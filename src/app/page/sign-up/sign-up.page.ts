import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../modules/user';
import { SignUp } from 'src/app/modules/newModules/login';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  //private user:User;
  public user:SignUp=new SignUp();
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }
  signUp(){
    console.log(this.user);
    this.authService.register(this.user);
    this.router.navigateByUrl('/regist-user-profile');
  }

}
