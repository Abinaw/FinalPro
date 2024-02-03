import { Component, Inject, InjectionToken } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/userService/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AudioService } from 'src/app/service/audio-service/audio-service.service';
import { GridApi, ICellRendererParams } from 'ag-grid';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-delete-pop',
    templateUrl: './action-pop.component.html',
    styleUrls: ['./action-pop.component.css']
})
export class ActionPopComponent {



    constructor(
        private toastr: ToastrService,
        public dialogRef: MatDialogRef<ActionPopComponent>,
        //the data has been passed from actionCellComponent within the openDelDialog() has been injected by the below line  
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    onClose(state:boolean){
        this.dialogRef.close(state)
        if(!state)  
        this.toastr.info("The "+ this.data.title+" operation has been cancelled")
    }


}

