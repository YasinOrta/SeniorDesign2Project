import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})

@Injectable({ providedIn: 'root'})

export class AdminPanelComponent {

  public users: any = [];
  public cities: any = [];
  public emptyList: any = [];
  public provinces: any = [];

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })
  public cityList:Array<any> = [];
  public provinceList:Array<any> = [];

  constructor(private router: Router, private api: ApiService){}

  ngOnInit(){
    this.api.getUsers().subscribe(res=>{
      this.users = res;
      console.log(this.users)
    })

    this.api.getCities().subscribe(res =>{
      this.cities = res;
      console.log(this.cities)
    })

    this.api.getProvinces().subscribe(res =>{
      this.provinces = res;
      console.log(this.provinces)
    })
  }

  addUser(){
    this.router.navigate(['addUser']);
  }

  deleteUser(){
    this.router.navigate(['deleteUser']);
  }

  editUser(){
    this.router.navigate(['editUser']);
  }

  addCity(){
    this.router.navigate(['addCity']);
  }
  deleteCity(){
    this.router.navigate(['deleteCity']);
  }
  editCity(){
    this.router.navigate(['editCity']);
  }

  addProvince(){
    this.router.navigate(['addProvince']);
  }
  editProvince(){
    this.router.navigate(['editProvince']);
  }
  deleteProvince(){
    this.router.navigate(['deleteProvince']);
  }

  onSearchUpdated(sq: string)
  {
    if(sq === "" || this.hasWhiteSpace(sq)){
      this.api.getProvinces().subscribe(res =>{
        this.provinceList = res;
        console.log(this.provinceList)
      })
    }else {
      this.api.getProvincesSearch(this.searchForm.value.search).subscribe(res=>{
        this.provinceList = res
        console.log(this.provinceList)
      });
    }
  }

  clearResult(){
    this.provinceList = this.emptyList; 
  }

  hasWhiteSpace(s: string) {
    return s.indexOf(' ') >= 0;
  }
}
