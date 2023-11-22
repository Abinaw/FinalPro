import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../../../../assets/CSS/FormDesign.css']

})

export class SignUpComponent {

  username: string = "Kabil";
  gender: string = "Male";
  role: string = "Admin";
  email: string = "Kabil@gmail.com";
  password: string = "Plant12345678";



  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    ) {

    }

  ngOnInit(): void {

  }


  registerForm=this.builder.group({
    name: ['', Validators.required],
    gender: [''], // You can set a default value here if needed
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })


 registerUser(){
  if(this.registerForm.valid){
    let registerRequest ={
      "username":this.username,
      "gender":this.gender,
      "role":this.role,
      "email":this.email,
      "password":this.password
    }


    this.authService.regiterReq(registerRequest).subscribe((res)=>{
      console.log(res)
     })
  }
}


open(){
  this.dialog.open(UserRegistrationComponent);
}



}
