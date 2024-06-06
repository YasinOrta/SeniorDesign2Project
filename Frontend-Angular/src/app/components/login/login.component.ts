import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateForm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
  }

  //logic to show or not show password
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid){
      //send the obj to database
      //delete later below log
      console.log(this.loginForm.value)

      this.auth.login(this.loginForm.value).subscribe({
        next: (res)=>{
          this.toastr.success("Logged successfully!","Success", {timeOut: 3000});
          //alert(res.message)
          this.loginForm.reset();
          this.auth.storeToken(res.token);//res is a reference to response object
          this.router.navigate(['home/userPage']);
        },
        error:(err)=>{
          this.toastr.error("Invalid user or password!", "Failed!", {timeOut: 3000});
          //alert(err?.error.message)
        }
      })
    }
    else{
      
      ValidateForm.validateAllFormFields(this.loginForm);
      this.toastr.error("Form is invalid!", "Failed!", {timeOut: 3000});
      //alert("Form is invalid.")
    }
  }
}
