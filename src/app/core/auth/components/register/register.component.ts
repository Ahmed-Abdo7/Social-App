import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../../../flowbite.server';
import { initFlowbite } from 'flowbite';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServer } from '../../services/auth.server';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
   private readonly flowbiteService = inject(FlowbiteService);
   private readonly toaster = inject(ToastrService);
   private readonly router = inject(Router);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  private readonly authServer = inject(AuthServer)

  FormRegister: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    dateOfBirth: new FormControl(null, [Validators.required]) , 
    gender: new FormControl(null, [Validators.required]) , 
    password: new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]) ,
    rePassword: new FormControl(null , [Validators.required]) , 
    
    
  } , { validators: this.handleConfirmPassword });
  
  handleConfirmPassword(group: AbstractControl){
    if(group.get('rePassword')?.value !== group.get('password')?.value){
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    else{
      group.get('rePassword')?.setErrors(null); 
      return null;
    }
  }

  sendRegisterData(){
    this.authServer.register(this.FormRegister.value).subscribe({
      next: (res) => {
      
        this.toaster.success(res.message , "Social App");
        this.router.navigate(['/login']);
        this.FormRegister.reset();
      }
    })
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }
  markAllAsTouched(){
    this.FormRegister.markAllAsTouched();
  }

}
