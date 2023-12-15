import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserDataComponent } from '../../modules/userData/userData.component';
import { UserService } from 'src/app/service/userService/user.service';
import { GridApi } from 'ag-grid';
import { ActionPopComponent } from 'src/app/custom-components/action-cell/action-pop/action-pop.component';
//Validation and password checking works pending

@Component({
    selector: 'app-user-registration',
    templateUrl: './userRegistration-form.html',
    styleUrls: ['./userRegistration-form.css']
})
export class UserRegistrationForm implements OnInit {
    userForm: FormGroup;
    hide: boolean = true;
    allData: any;

    constructor(
        private matDialog: MatDialog,
        private matDialogRef: MatDialogRef<UserRegistrationForm>,
        private fromBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
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
    ngOnInit(): void {

    }
    agInit() {

    }

    selectOperation() {
        if (this.data.title === "Insert") {
            this.insertPopTrigger();
        } else {
            this.updatePopTrigger();
        }

    }
    insertPopTrigger() {
        if (this.userForm.valid) {
        const extraData = {
            title: "Insert",
            subTitle: "are you sure you want to add this data?",
            userformData: this.userForm
        }
        const dialogRef = this.matDialog.open(ActionPopComponent, { data: extraData })
        dialogRef.afterClosed().subscribe(() => {
            this.matDialogRef.close()
        })
    }else{
        alert("Invalid Data")
    }
    }


    updatePopTrigger() {
        if (this.userForm.valid) {
            const extraData = {
                title: "Update",
                subTitle: "are you sure you want to update the selected data?"
            }
            this.matDialog.open(ActionPopComponent, { data: extraData })
        }else{

        }
        // const data=this.data.userdata;
        // this.userForm = this.fromBuilder.group({
        //     firstname: data.userId,
        //     lastname:data.lastname,
        //     username: data.username,
        //     gender: data.gender,
        //     role: data.role,
        //     email: data.email,
        //     password:data.password,
        //     confirmPw: data.confirmPw
        // })
    }

}
