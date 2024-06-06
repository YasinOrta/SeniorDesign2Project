import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router, private helper: JwtHelperService, private auth: AuthService, private toastr: ToastrService){}
  
  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  goUserPage(){
    this.router.navigate(['/home/userPage'])
  }
  goAdminPanel(){
    var token = this.auth.getToken();
    if(token != null){
      var decodedToken = this.getDecodedAccessToken(token);
      console.log("Decoded Token: "+decodedToken.role);
      if(decodedToken.role == "admin" || decodedToken.role == "Admin"){
        this.toastr.success("Welcome to Admin Panel!", "Success", {timeOut: 3000})
        this.router.navigate(['/home/adminPanel'])   
      }
      else {
        this.toastr.error("Unauthorized Action!", "Failed!", {timeOut: 3000});
      }
    }
    else {
      this.toastr.error("Token is missing!", "Failed!", {timeOut: 3000});
    }
  }
  getDecodedAccessToken(token: string): any{
    try{
      return this.helper.decodeToken(token);
    } catch(error){
      return null;
    }
  }
}
