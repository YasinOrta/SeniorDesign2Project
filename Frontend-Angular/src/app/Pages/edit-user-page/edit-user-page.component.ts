import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrl: './edit-user-page.component.scss'
})
export class EditUserPageComponent {

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService){}

  editForm!: FormGroup;

  ngOnInit(): void {
    this.editForm = this.fb.group({
      Id: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      userName: [''],
      email: [''],
      password: [''],
      role: ['']
    })
}

editUser(){
    if(this.editForm.valid){
      console.log(this.editForm.value)

      this.auth.userUpdate(this.editForm.value).subscribe({
        next: (res=> {
          this.toastr.success("User information updated successfully!","Success", {timeOut: 3000});
          this.editForm.reset();
          setTimeout(function(){
            window.location.reload();
          }, 3000);
        })
        ,error:(err => {
          this.toastr.error("Problem occurred!", "Failed!");
        })
      })
      this.router.navigate(['home/adminPanel']);
    }
    else{
      //logic for throwing error
      ValidateForm.validateAllFormFields(this.editForm);
    }
  }

  goBack(){
    this.router.navigate(['home/adminPanel'])
  }

}
