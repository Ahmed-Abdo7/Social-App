import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServer } from '../../services/auth.server';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent  {
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly authServer = inject(AuthServer);
  loginForm : FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.email]) , 
    password: new FormControl(null , [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]) , 
    
  })
  

  sendLoginData(){
    this.authServer.login(this.loginForm.value).subscribe({
      next: (res) => {
        if(res.success){
          localStorage.setItem('token' , res.data.token);
          this.toastr.success(res.message , "Social App");
          this.router.navigate(['/feed']);
          this.loginForm.reset();
        }
      }
    })
  }

  navigateToRegister(){
    this.router.navigate(['/sign-up']);
  }
}
