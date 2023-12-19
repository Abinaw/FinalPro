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
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            gender: ['', Validators.required],
            role: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPw: ['', Validators.required],
        })
    }

    setDataIntoFormFields() {
      return  this.userForm.setValue({
            firstname: this.data.userdata.firstname,
            lastname: this.data.userdata.lastname,
            username: this.data.userdata.username,
            gender: this.data.userdata.gender,
            role: this.data.userdata.role,
            email: this.data.userdata.email,
            password: null,
            confirmPw: null
        })
    }

    ngOnInit(): void {
        if (this.data.title === "Update") {
            this.setDataIntoFormFields()
        }
    }
    agInit() {


    }

    selectOperation() {
        if (this.data.title === "Insert" && 
        this.userForm.valid && this.userForm.value.password === this.userForm.value.confirmPw) {
            this.insertPopTrigger();
        }else if(this.data.title == "Update" && 
        this.userForm.value.password=== this.userForm.value.confirmPw||
        this.userForm.value.password && this.userForm.value.confirmPw ==null)
        this.updatePopTrigger();
    

        // if (this.userForm.valid && this.userForm.value.password === this.userForm.value.confirmPw) {
        //     if(this.data.title=="Update"){
        //         this.updatePopTrigger();
        //     }else if(this.data.title === "Insert"){
        //         this.insertPopTrigger();
        //     }
        // }else{
        //     if(this.userForm.value.password != this.userForm.value.confirmPw){
        //     alert("Password isn't matching!")
        //     }else{
        //         alert("Invalid")
        //     }
        // }

    }
    insertPopTrigger() {

        const extraData = {
            title: "Insert",
            subTitle: "are you sure you want to add this data?",
            userformData: this.userForm
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe(() => {
            this.matDialogRef.close()
        })

    }



    updatePopTrigger() {

        const extraData = {
            title: this.data.title,
            subTitle: "are you sure you want to update the selected data?",
            userformData: this.userForm.value,
            userId: this.data.userdata.userId
            
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe(() => {
            this.matDialogRef.close();
        })

    }

}
