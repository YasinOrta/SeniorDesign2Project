import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Edit IIS-AngularAPI-No1 in WF.msc / inbound rules and start the server from the iis to use it

  //For mobile usage below adresses are used.
  /* private baseUrl: string = "http://192.168.99.108:86/api/User/"
  private baseUrlcity: string = "http://192.168.99.108:86/api/City/"
  private baseUrlprovince: string = "http://192.168.99.108:86/api/Province/"  */

  //For web usage below adresses are used.
  /* private baseUrl: string = "http://localhost:86/api/User/"
  private baseUrlcity: string = "http://localhost:86/api/City/"
  private baseUrlprovince: string = "http://localhost:86/api/Province/" */

  private baseUrl:string = "http://localhost:5276/api/User/"
  private baseUrlcity: string = "http://localhost:5276/api/City/"
  private baseUrlprovince: string = "http://localhost:5276/api/Province/"

  constructor(private http: HttpClient,private toastr: ToastrService) { }

  getUsers(){
    return this.http.get<any>(`${this.baseUrl}GetAllUsers`);
  }

  getCities(){
    return this.http.get<any>(`${this.baseUrlcity}GetCities`);
  }

  getCitiesByCityName(name: any){
    let param = new HttpParams().set("name",name)
    return this.http.get<any>(`${this.baseUrlcity}GetCitiesByName`,{params: param});
  }

  getCitiesSearch(cityName: string): Observable<any>{
    return this.http.get(`${this.baseUrlcity}Search?cityName=${cityName}`)
  }

  getProvincesSearch(provinceName: string): Observable<any>{
    return this.http.get(`${this.baseUrlprovince}Search?provinceName=${provinceName}`)
  }

  getProvinces(){
    console.log(`${this.baseUrlprovince}GetProvinces`)
    return this.http.get<any>(`${this.baseUrlprovince}GetProvinces`);
  }
}
