import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //For mobile usage below adresses are used.
  /* private baseUrl:string = "http://192.168.99.108:86/api/User/"
  private baseUrlCity: string = "http://192.168.99.108:86/api/City/"
  private baseUrlProvince: string = "http://192.168.99.108:86/api/Province/"  */

  //For web usage below adresses are used.
  /*private baseUrl:string = "http://localhost:86/api/User/"
  private baseUrlCity: string = "http://localhost:86/api/City/"
  private baseUrlProvince: string = "http://localhost:86/api/Province/" */

  private baseUrl:string = "http://localhost:5276/api/User/"
  private baseUrlCity: string = "http://localhost:5276/api/City/"
  private baseUrlProvince: string = "http://localhost:5276/api/Province/"
  
  
  constructor(private http: HttpClient) { }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }

  deleteUser(userObj:any){
    return this.http.delete<any>(`${this.baseUrl}DeleteUser${userObj.Id}`,userObj);
  }

  userUpdate(userObj:any){
    return this.http.put<any>(`${this.baseUrl}UpdateUser${userObj.Id}`,userObj);
  }

  signUpUser(userObj:any){
    return this.http.post<any>(`${this.baseUrl}registerWithoutSeeingId`,userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  cityAdd(cityObj:any){
    return this.http.post<any>(`${this.baseUrlCity}CreateCity`,cityObj);
  }
  cityDelete(cityObj:any){
    return this.http.delete<any>(`${this.baseUrlCity}DeleteCity${cityObj.Id}`,cityObj);
  }
  
  cityEdit(cityObj:any){
    return this.http.put<any>(`${this.baseUrlCity}UpdateCity${cityObj.Id}`,cityObj);
  }

  provinceAdd(provinceObj: any){
    return this.http.post<any>(`${this.baseUrlProvince}CreateProvince`,provinceObj);
  }
  provinceEdit(provinceObj: any){
    return this.http.put<any>(`${this.baseUrlProvince}UpdateProvince${provinceObj.Id}`,provinceObj);
  }
  provinceDelete(provinceObj: any){
    return this.http.delete<any>(`${this.baseUrlProvince}DeleteProvince${provinceObj.Id}`,provinceObj);
  }
}
