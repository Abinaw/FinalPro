import { Component, Inject, InjectionToken } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/userService/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionCellComponent } from '../action-cell.component';
import { UserRegistrationForm } from 'src/app/Template/auth-forms/registration-form/userRegistration-form.component';

@Component({
    selector: 'app-delete-pop',
    templateUrl: './action-pop.component.html',
    styleUrls: ['./action-pop.component.css']
})
export class ActionPopComponent {



    constructor(
        public dialogRef: MatDialogRef<ActionPopComponent>,
        private userService: UserService,
        //the data has been passed from actionCellComponent within the openDelDialog() has been injected by the below line  
        @Inject(MAT_DIALOG_DATA) public data: any 
    ) {
        
    }

    selectOperation(){
        if(this.data.title==="Delete"){
           this.deleteDataYes()
        }else if(this.data.title==="Update"){
            this.updateDataYes()
        }else if(this.data.title==="Insert"){
            this.insertDataYes()
        }
    }

    
    deleteDataYes() {
        this.userService.deleteUserDetails(this.data.userId).subscribe(
            {
                next: (val) => console.log(val)
                ,
                error: (err) => console.log(err)
            })
            
    }

    updateDataYes(){

            this.userService.updateUserDetails()
        
    }


    insertDataYes(){
            let regRequestData=this.data.userformData.value
            console.log(regRequestData)
            this.userService.regiterReq(regRequestData).subscribe({
                next: (val) => {
                    
                },
                error: (err) => {
                    console.log(err)
                }
            })
    }

    onclose(){
        this.dialogRef.close();
    }
}

