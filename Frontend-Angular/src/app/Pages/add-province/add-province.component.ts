import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-add-province',
  templateUrl: './add-province.component.html',
  styleUrl: './add-province.component.scss'
})
export class AddProvinceComponent {

  signUpFormProvince!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.signUpFormProvince = this.fb.group({
      Name: ['', Validators.required],
      Vehicle_Registration_Plate: ['', Validators.required],
      Region_Location: ['', Validators.required],
      PopularFoods: ['', Validators.required],
      PopularProducedItems: ['', Validators.required],
      Population: ['', Validators.required],
      IsCapitalCity: ['', Validators.required],
      imgUrl: ['', Validators.required],
      About: ['', Validators.required]
    })
  }

  addProvince(){
    if(this.signUpFormProvince.valid){
      console.log(this.signUpFormProvince.value)
      this.auth.provinceAdd(this.signUpFormProvince.value).subscribe({
        next: (res => {
          this.toastr.success("Province Saved!", "Success", {timeOut: 3000});
          this.signUpFormProvince.reset();
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
      ValidateForm.validateAllFormFields(this.signUpFormProvince);
    }
  }

  goBack(){
    this.router.navigate(['home/adminPanel']);
  }
}
