import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toastr: ToastrService, private router: Router){}

  //intercept the request part
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const myToken = this.auth.getToken();

      //modify the request part
      if(myToken){
        req = req.clone({
          setHeaders: {Authorization: `Bearer ${myToken}`}
          //setHeaders: {wfc: 'Omega Key Activation'}
        })
      }

      //send the request back part
      return next.handle(req).pipe(
        catchError((err:any)=>{
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.toastr.warning("Token is expired!","Warning",{timeOut:3000})
              this.router.navigate([('login')]);
            }
          }
          return throwError(()=>new Error("Problem occurred!"))
        })
      )
  }

}