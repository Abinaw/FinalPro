import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RegisterRequest } from './RegisterRequest';
import { map } from 'rxjs';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../../../../assets/CSS/FormDesign.css']

})

export class SignUpComponent {

  id:number= 0;
  username: string = "";
  gender: string = "";
  role: string = "";
  email: string = "";
  password: string = "";



  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    ) {

    }

  ngOnInit(): void {

  }


  registerForm=this.builder.group({
    id:['',Validators.required],
    name: ['', Validators.required],
    gender: [''], // You can set a default value here if needed
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })


 registerUser(){
  if(this.registerForm.valid){
    let registerRequest ={
      "id" : this.id,
      "username":this.username,
      "gender":this.gender,
      "role":this.role,
      "email":this.email,
      "password":this.password
    }

    // Update the properties of the regReq object
    this.authService.regiterReq(registerRequest).subscribe((res)=>{
      console.log(res)
    })
  }
}



}
