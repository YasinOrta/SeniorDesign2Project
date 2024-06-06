import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-delete-province',
  templateUrl: './delete-province.component.html',
  styleUrl: './delete-province.component.scss'
})
export class DeleteProvinceComponent {
  deleteFormProvince!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private auth: AuthService){}

  ngOnInit(): void {
    this.deleteFormProvince = this.fb.group({
      Id: ['', Validators.required]
    })
}

 onDelete(){
    if(this.deleteFormProvince.valid){
      console.log(this.deleteFormProvince)

      this.auth.provinceDelete(this.deleteFormProvince.value).subscribe({
        next: (res => {
          this.toastr.success("Province is deleted.!", "Success", {timeOut: 3000});
          this.deleteFormProvince.reset();
          setTimeout(function(){
            window.location.reload();
          }, 3000);
        })
        ,error:(err => {
          this.toastr.error("Invalid id,problem occured!","Failed!");
        })
      })
      this.router.navigate(['home/adminPanel']);
    }
    else{
      ValidateForm.validateAllFormFields(this.deleteFormProvince);
    }
  }


  goBack(){
    this.router.navigate(['home/adminPanel']);
  }
}
