import { Component } from '@angular/core';
import { GridApi, ICellRendererParams } from 'ag-grid';
import {
    MatDialog,
  } from '@angular/material/dialog';
import { DeletePopComponent } from './delete-pop/delete-pop.component';
import { __param } from 'tslib';
import { UserDataComponent } from 'src/app/Template/modules/userData/userData.component';
@Component({
    selector: 'app-action-cell',
    templateUrl: './action-cell.component.html',
    styleUrls: ['./action-cell.component.css'],
    template: '',
})
export class ActionCellComponent {
    dataFromRow: any;
    gridApi: GridApi | any = {};


    constructor(
        public matDialog: MatDialog,
        public userDataClass: UserDataComponent
    ) {

    }

    agInit(params: ICellRendererParams): void {
        this.dataFromRow = params && params.data ? params.data : {};
        this.gridApi = params.api;
     }


    openDelDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        
        // const extraData = {
        //     title : "Delete Customer",
        //     subTitle: "Do you want to delete this customer?"}
    //    const deletePop= this.matDialog.open(DeletePopComponent, {data: {userId:this.data, extraData:extraData}});
       const deletePop= this.matDialog.open(DeletePopComponent,{
        data:this.dataFromRow.userId,
    });
       deletePop.afterClosed().subscribe(()=>{
            this.userDataClass.setDataIntoRow();
       })
    }
}


