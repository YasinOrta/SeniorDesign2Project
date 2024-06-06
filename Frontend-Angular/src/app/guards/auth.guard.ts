
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private jwtHelper: JwtHelperService, private toastr: ToastrService){}

  //below code and if condition nullifies the localstorage undefined error from ssr
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';


  canActivate(): boolean {
    if (this.isLocalStorageAvailable){
      if(this.auth.isLoggedIn())
      {
        if(this.jwtHelper.isTokenExpired(this.auth.getToken())){
          this.router.navigate(['login']);
          this.toastr.warning("Token is expired!","Warning",{timeOut: 3000})
          return false;
        }
        else {
          return true;
        }
      }
      else
      {
        console.log('Unauthorized process!!!')
        this.router.navigate(['login'])
        return false;
      } 
    }
    return false;
  }
}