import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-compo',
  templateUrl: './login-compo.component.html',
  styleUrls: ['./login-compo.component.css']
})

export class LoginCompoComponent implements OnInit {
 hide:boolean=true;
logForm : FormGroup;





  ngOnInit(): void {

  }

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { 

    this.logForm=new FormGroup({
        userName:new FormControl(null,Validators.required),
        password: new FormControl(null,Validators.required)
        })

  }

  message: any;


  loginUser(): void {
    

    this.authService.logInReq(this.logForm.value).subscribe((res) => {
        console.log(res)
        console.log("entered!")

        var result = JSON.parse(res)
       
        const token = result.token
        if(this.authService.isValidJWT(token)){
            console.log("working")
            this.authService.login(result.token)    
            this.router.navigate(["/dash-board"]);
        }
    },(err)=>{
        alert("invalid")
    });
  }
}
