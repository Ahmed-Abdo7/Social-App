import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SittingServer } from '../services/sitting.server';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly sittingServer = inject(SittingServer);
  private readonly router = inject(Router);

  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required,Validators.minLength(8)]),
    newPassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
  });

  onSubmit(){
    this.changePasswordForm.markAllAsTouched();
    if(this.changePasswordForm.valid){
      this.sittingServer.changePassWord(this.changePasswordForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.changePasswordForm.reset();
          setTimeout(() => {
            
            if(res.token){
              localStorage.setItem("token" , res.token);
              this.router.navigate(['/feed']);
            }else{
              localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
        } , 1000)
        }
      })
    }
  }
}
