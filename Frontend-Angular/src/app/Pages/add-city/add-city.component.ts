import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.scss'
})
export class AddCityComponent {
  signUpFormCity!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.signUpFormCity = this.fb.group({
      cityId: ['', Validators.required],
      cityName: ['', Validators.required],
      cityLocation: ['', Validators.required],
      districtId: ['', Validators.required],
      districtName: ['', Validators.required],
      districtAbout: ['', Validators.required],
      districtLocation: ['', Validators.required],
      districtImgUrl: ['', Validators.required]
    })
  }


  addCity(){
    if(this.signUpFormCity.valid){
      console.log(this.signUpFormCity.value)
      this.auth.cityAdd(this.signUpFormCity.value).subscribe({
        next: (res => {
          this.toastr.success("City Saved!", "Success", {timeOut: 3000});
          this.signUpFormCity.reset();
          setTimeout(function(){
            window.location.reload();
          }, 3000);
        })
        ,error: (err=> {
          this.toastr.error("Form is invalid!", "Failed!");
        })
      })
      this.router.navigate(['home/adminPanel']);
    }
    else {
      ValidateForm.validateAllFormFields(this.signUpFormCity);
    }
  }

  goBack(){
    this.router.navigate(['home/adminPanel']);
  }
}
