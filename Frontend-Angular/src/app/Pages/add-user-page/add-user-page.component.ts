import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrl: './add-user-page.component.scss'
})
export class AddUserPageComponent {

  signUpForm!: FormGroup;
  type: string = "password"

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
}
  addUser(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value)

      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res=> {
          this.toastr.success("Registered successfully!","Success", {timeOut: 3000});
          this.signUpForm.reset();
          setTimeout(function(){
            window.location.reload();
          }, 3000);
        })
        ,error:(err => {
          this.toastr.error("Form is invalid!", "Failed!");
        })
      })
      this.router.navigate(['home/adminPanel']);
    }
    else{
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }

  goBack(){
    this.router.navigate(['home/adminPanel']);   
  }

}
