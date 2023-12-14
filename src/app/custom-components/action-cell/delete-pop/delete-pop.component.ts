import { Component, Inject, InjectionToken } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GridApi, ICellRendererParams } from 'ag-grid';
import { UserService } from 'src/app/service/userService/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { toArray } from 'rxjs';

@Component({
    selector: 'app-delete-pop',
    templateUrl: './delete-pop.component.html',
    styleUrls: ['./delete-pop.component.css']
})
export class DeletePopComponent {



    constructor(
        public dialogRef: MatDialogRef<DeletePopComponent>,
        private userService: UserService,
        //the data has been passed from actionCellComponent within the openDelDialog() has been injected by the below line  
        @Inject(MAT_DIALOG_DATA) public data: {data:string}
    ) {
        
    }

    
    deleteDataYes() {
        console.log((this.data))
       
        this.userService.deleteUserDetails(this.data).subscribe(
            {
                next: (val) => console.log(val)
                ,
                error: (err) => console.log(err)
            })
    }

}

