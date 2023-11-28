import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';



@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css', '../../../../assets/CSS/FormDesign.css']

})

export class SignUpComponent {

    username: string = "";
    gender: string = "";
    role: string = "";
    email: string = "";
    password: string = "";
    confirmPW: string = "";


    constructor(
        public matDialogRef: MatDialogRef<SignUpComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private builder: FormBuilder,
        private dialog: MatDialog,
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {

    }


    registerForm = this.builder.group({
        name: ['', Validators.required],
        gender: [''], // You can set a default value here if needed
        role: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPw: ['', Validators.required]
    })


    registerUser() {
        if (this.registerForm.valid) {
            let registerRequest = {
                "username": this.username,
                "gender": this.gender,
                "role": this.role,
                "email": this.email,
                "password": this.password,
                "confirmPW":this.confirmPW
            }


            this.authService.regiterReq(registerRequest).subscribe((res) => {
                console.log(res)
            })
        }
    }


    open() {
        this.dialog.open(UserRegistrationComponent);
    }



}
