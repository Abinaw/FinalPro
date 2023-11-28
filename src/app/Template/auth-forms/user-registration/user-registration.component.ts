import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { SignUpComponent } from '../sign-up/sign-up.component';


//Validation and password checking works pending

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
    userForm:FormGroup;
    hide:boolean = true;
    constructor(
        private matDialogRef: MatDialogRef<UserRegistrationComponent>,
        private fromBuilder: FormBuilder,
        private dialog: MatDialog,
        private authService: AuthService,
    ) {
        this.userForm = this.fromBuilder.group({
            firstname:'',
            lastname:'',
            username:'',
            gender:'',
            role:'',
            email: '',
            password: '',
            confirmPw: ''
        })
    }

    

    onFormSubmit() {
       
         if (this.userForm.valid) {
            this.authService.regiterReq(this.userForm.value).subscribe({
                next:(val:any)=>{
                    console.log(val)
                    this.matDialogRef.close();
                },
                error:(err:any)=>{
                    console.log(err)
                }
            })
        }
    
            
        
    }


    open() {
        this.dialog.open(UserRegistrationComponent);
    }


}
