import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;

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

  //logic to show or not show password
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignUp(){
    if(this.signUpForm.valid){
      //perform logic for signUp
      //later delete below log
      console.log(this.signUpForm.value)

      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res=> {
          //alert(res.message)
          this.toastr.success("Registered successfully!","Success", {timeOut: 3000});
          this.signUpForm.reset();
          this.router.navigate(['login']);
        })
        ,error:(err => {
          //alert(err?.error.message)
          this.toastr.error("Form is invalid!", "Failed!");
        })
      })

    }
    else{
      //logic for throwing error
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }
}
