import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../servicios/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class NotLoggedGuard implements CanActivate {
  constructor(private serv: AuthService) {}
  canActivate() {
    console.log(this.serv.getCurrentUser());
    //return this.serv.getCurrentUser() == null;
    return true;
  }
}
