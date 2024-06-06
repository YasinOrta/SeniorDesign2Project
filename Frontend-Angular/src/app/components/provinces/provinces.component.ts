import { Component, Input } from '@angular/core';
import { ProvinceDetails } from '../../interface/province-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrl: './provinces.component.scss'
})
export class ProvincesComponent {

  @Input() provinceDetails!: ProvinceDetails;

  constructor(private router: Router){
  }

  goDetails(){
    this.router.navigate(['details/'+this.provinceDetails.id]);
  }
}