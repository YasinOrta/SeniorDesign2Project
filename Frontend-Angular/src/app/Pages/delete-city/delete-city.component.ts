import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-delete-city',
  templateUrl: './delete-city.component.html',
  styleUrl: './delete-city.component.scss'
})
export class DeleteCityComponent {
  deleteForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private auth: AuthService){}

  ngOnInit(): void {
    this.deleteForm = this.fb.group({
      Id: ['', Validators.required]
    })
}

 onDelete(){
    if(this.deleteForm.valid){
      console.log(this.deleteForm)

      this.auth.cityDelete(this.deleteForm.value).subscribe({
        next: (res => {
          this.toastr.success("City is deleted.!", "Success", {timeOut: 3000});
          this.deleteForm.reset();
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
      ValidateForm.validateAllFormFields(this.deleteForm);
    }
  }


  goBack(){
    this.router.navigate(['home/adminPanel']);
  }
}
