import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiService } from '../_service/apiService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSubmit:boolean = false;
  loginForm: any;
  // isLoggedin: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private apiService:ApiService) {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if(user !== null){
      this.router.navigateByUrl('/products');
    }
  }

  get formControls(){
    return this.loginForm.controls;
  }

  submitForm():void{
    this.isSubmit = true;
    console.log(this.loginForm.value);
    if(this.loginForm.invalid){
      return;
    }else{
      this.apiService.login(this.formControls.email.value, this.formControls.password.value)
      .pipe(first())
      .subscribe(response=>{
        if(response.token && response.token !== null){
          this.router.navigateByUrl('/products')
        }
      })
    }
  }

}
