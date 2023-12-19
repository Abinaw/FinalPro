import { Component } from '@angular/core';
import { GridApi, ICellRendererParams } from 'ag-grid';
import {
    MatDialog,
  } from '@angular/material/dialog';
import { __param } from 'tslib';
import { UserDataComponent } from 'src/app/Template/modules/userData/userData.component';
import { UserRegistrationForm } from 'src/app/Template/auth-forms/registration-form/userRegistration-form.component';
import { ActionPopComponent } from './action-pop/action-pop.component';
import { UserService } from 'src/app/service/userService/user.service';
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
        private userService:UserService
       
    ) {

    }

    agInit(params: ICellRendererParams): void {
        this.dataFromRow = params && params.data ? params.data : {};
        this.gridApi = params.api;
     }

     public setDataIntoRow() {
        this.userService.getAllUser().subscribe((res) => {
            this.gridApi.setRowData(res);
        })
    }

    openDelDialog(): void {
        
        const extraData = {
            title : "Delete",
            subTitle: "Do you want to delete this customer?",
            userId: this.dataFromRow.userId,
        }
        const deletePop= this.matDialog.open(ActionPopComponent, {data: extraData});
        deletePop.afterClosed().subscribe(()=>{
            this.setDataIntoRow()
       })
       
    }
    
    updateFormTrigger() {
        const extraData={
            title: "Update",
            userdata:this.dataFromRow
           
        }
        const dialogRef = this.matDialog.open(UserRegistrationForm, {data:extraData},);
        dialogRef.afterClosed().subscribe(()=>{
            this.setDataIntoRow()
        })
        
        
        
       
        }
}


