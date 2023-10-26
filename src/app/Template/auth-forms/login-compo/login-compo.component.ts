import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/Template/auth-forms/login-compo/LoginRequest';


@Component({
  selector: 'app-login-compo',
  templateUrl: './login-compo.component.html',
  styleUrls: ['./login-compo.component.css', '../../../../assets/CSS/FormDesign.css']
})

export class LoginCompoComponent implements OnInit {
password: string="";
username: string="";



  ngOnInit(): void {

  }

  constructor(
    private authService: AuthService,
    private builder: FormBuilder
  ) { }

  message: any;

  loginForm = this.builder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })



  loginUser(): void {
    let logInRequest={
      "username":this.username,
      "password":this.password
    };

    this.authService.logInReq(logInRequest).subscribe((res) => {
      console.log(res)
    });
  }
}
