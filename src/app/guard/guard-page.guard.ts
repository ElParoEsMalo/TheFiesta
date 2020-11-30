import { AuthService } from "./../servicios/auth/auth.service";
import { DataService } from "./../servicios/data/data.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GuardPageGuard implements CanActivate{
  constructor(private serv: AuthService) {}
  canActivate() {
    return this.serv.getCurrentUser() != null;
  }
}
