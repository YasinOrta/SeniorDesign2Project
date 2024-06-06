import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-update-city',
  templateUrl: './update-city.component.html',
  styleUrl: './update-city.component.scss'
})
export class UpdateCityComponent {
  updateCityForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.updateCityForm = this.fb.group({
      Id: ['', Validators.required],
      cityId: [''],
      cityName: [''],
      cityLocation: [''],
      districtId: [''],
      districtName: [''],
      districtAbout: [''],
      districtLocation: [''],
      districtImgUrl: ['']
    })
  }

  updateCity(){
    if(this.updateCityForm.valid){
    console.log(this.updateCityForm.value)

    this.auth.cityEdit(this.updateCityForm.value).subscribe({
      next: (res=> {
        this.toastr.success("City information updated successfully!","Success", {timeOut: 3000});
        this.updateCityForm.reset();
        setTimeout(function(){
          window.location.reload();
        }, 3000);
      })
      ,error:(err => {
        this.toastr.error("Problem occurred!", "Failed!");
        console.log(err)
      })
    })
    this.router.navigate(['home/adminPanel']);
  }
  else{
    //logic for throwing error
    ValidateForm.validateAllFormFields(this.updateCityForm);
  }
}
  

  goBack(){
    this.router.navigate(['home/adminPanel']);
  }

}
