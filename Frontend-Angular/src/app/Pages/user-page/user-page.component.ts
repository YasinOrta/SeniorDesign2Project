import { Component} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {

  provinceDbList:any = [];
  provinceDbListForSwipe:any = [];

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  constructor(private api: ApiService){}

  ngOnInit(){
    this.api.getProvinces().subscribe(res => {
      this.provinceDbList = res;
      this.provinceDbListForSwipe = res;
    })
  }

  goCityList(sq: string){
    if(sq === "" || this.hasWhiteSpace(sq)){
      this.api.getProvinces().subscribe(res =>{
        this.provinceDbList = res;
        console.log(this.provinceDbList)
      })
    }else {
      this.api.getProvincesSearch(this.searchForm.value.search).subscribe(res=>{
        this.provinceDbList = res
        console.log(this.provinceDbList)
      });
    }
  }

  hasWhiteSpace(s: string) {
    return s.indexOf(' ') >= 0;
  }
}
