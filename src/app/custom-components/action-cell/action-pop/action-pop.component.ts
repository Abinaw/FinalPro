import { Component, Inject, InjectionToken } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/userService/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AudioService } from 'src/app/service/audio-service/audio-service.service';
@Component({
    selector: 'app-delete-pop',
    templateUrl: './action-pop.component.html',
    styleUrls: ['./action-pop.component.css']
})
export class ActionPopComponent {



    constructor(
        public audService :AudioService,
        public dialogRef: MatDialogRef<ActionPopComponent>,
        private userService: UserService,
        //the data has been passed from actionCellComponent within the openDelDialog() has been injected by the below line  
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    selectOperation() {
        if (this.data.title === "Delete") {
            this.deleteDataYes()
        } else if (this.data.title === "Update") {
            this.updateDataYes()
        } else if (this.data.title === "Insert") {
            this.insertDataYes()
        }
    }
    

    
    deleteDataYes() {
        this.audService.playSoundDelete();
        this.userService.deleteUserDetails(this.data.userId).subscribe(

            {
                next: (val) => console.log(val)
                ,
                error: (err) => console.log(err)
            })

    }

    updateDataYes() {
         this.audService.playSoundUpdate()
        let userId = this.data.userId;
        //userId added into the userForm data, had to do this separately since when updating the id is taken from the table and not from the form.
        this.data.userformData.userId = userId;
        // console.log( this.data.userformData)
        this.userService.updateUserDetails(this.data.userformData).subscribe({
            next: (val) => {
                console.log(val)
            },
            error: (err) => {
                console.log(err)
            }
        })

    }

    insertDataYes() {
        this.audService.playSoundInsert()
        let regRequestData = this.data.userformData.value
        this.userService.regiterReq(regRequestData).subscribe({
            next: (val) => {
            },
            error: (err) => {
                console.log(err)
            }
        })
    }


}

