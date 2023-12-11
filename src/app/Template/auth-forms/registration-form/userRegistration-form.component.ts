import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserDataComponent } from '../../modules/userData/userData.component';
import { UserService } from 'src/app/service/userService/user.service';
import { GridApi } from 'ag-grid';
//Validation and password checking works pending

@Component({
    selector: 'app-user-registration',
    templateUrl: './userRegistration-form.html',
    styleUrls: ['./userRegistration-form.css']
})
export class UserRegistrationForm {
    userCompo! :UserDataComponent;
    userForm: FormGroup;
    hide: boolean = true;
    allData: any;
   
    constructor(
        private matDialogRef: MatDialogRef<UserRegistrationForm>,
        private fromBuilder: FormBuilder,
        private userService: UserService,
    ) {
        this.userForm = this.fromBuilder.group({
            firstname: '',
            lastname: '',
            username: '',
            gender: '',
            role: '',
            email: '',
            password: '',
            confirmPw: ''
        })
    }

    saveUserData() {
        if (this.userForm.valid) {
            let regRequestData=this.userForm.value
            this.userService.regiterReq(regRequestData).subscribe({
                next: (val) => {
                    console.log(val)
                    this.matDialogRef.close();   
                },
                error: (err) => {
                    console.log(err)
                }
            })
            
        }
    }

}
