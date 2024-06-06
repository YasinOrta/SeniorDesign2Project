import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-edit-province',
  templateUrl: './edit-province.component.html',
  styleUrl: './edit-province.component.scss'
})
export class EditProvinceComponent {
  

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService) {}

  updateProvinceForm!: FormGroup;

  ngOnInit(): void {
    this.updateProvinceForm = this.fb.group({
      Id: ['', Validators.required],
      name: [''],
      vehicle_Registration_Plate: [''],
      region_Location: [''],
      popularFoods: [''],
      popularProducedItems: [''],
      population: [''],
      isCapitalCity: [''],
      imgUrl: [''],
      about: ['']
    })
  }

  updateProvince(){
    if(this.updateProvinceForm.valid){
    console.log(this.updateProvinceForm.value)

    this.auth.provinceEdit(this.updateProvinceForm.value).subscribe({
      next: (res=> {
        this.toastr.success("Province information updated successfully!","Success", {timeOut: 3000});
        this.updateProvinceForm.reset();
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
    ValidateForm.validateAllFormFields(this.updateProvinceForm);
  }
}
  

  goBack(){
    this.router.navigate(['home/adminPanel']);
  }
}
