import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvinceDetails } from '../../interface/province-details';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-province-details',
  templateUrl: './province-details.component.html',
  styleUrl: './province-details.component.scss'
})
export class ProvinceDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  province: ProvinceDetails | undefined;

 constructor(private router: Router, private api: ApiService, private toastr: ToastrService){}
 
  public districts: any = [];
  public sortedDistricts: any = [];
  public provinceDetailId: number = 1 ;

  private provinceDbList2:any = [];

  ngOnInit(){
    this.provinceDetailId = Number(this.route.snapshot.params['id']);
    this.getCityById(this.provinceDetailId); 
  }
  goHome(){
    this.router.navigate(['/home/userPage'])
  }

  topFunc(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  getCityById(Id:number){
    this.api.getProvinces().subscribe({
      next:(res => {
        this.provinceDbList2 = res;
        console.log("inside next, value: "+this.provinceDbList2)
        this.province = this.provinceDbList2.find((province: { id: number; }) => province.id == Id);
        console.log("province info acquired!")
        this.api.getCitiesByCityName(this.province?.name).subscribe(res=>{
          this.sortedDistricts = res;
        })
      }),
      error:(err=>{
        this.toastr.error("Problem Occured!", "Failed!");
      })
    })
  }
}
