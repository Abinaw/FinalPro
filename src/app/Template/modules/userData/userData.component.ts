import { Component, ViewChild, } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { UserRegistrationForm } from '../../auth-forms/registration-form/userRegistration-form.component';
import userDta from '../../../../assets/json/users.json'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActionCellComponent } from 'src/app/action-cell/action-cell.component';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './userData.component.html',
    styleUrls: ['./userData.component.css',],


})
export class UserDataComponent {


    rowData$!: Observable<any[]>;
    @ViewChild(AgGridAngular) 
    agGrid!:AgGridAngular
    gridApi: GridApi | any={}
  

    public columnDef: ColDef[] = [
        
        { field: "userId", hide:true,suppressColumnsToolPanel:true},
        { field: "firstname", },
        { field: "lastname", },
        { field: "username", },
        { field: "email", },
        { field: "gender", },
        { field: "role", },
        { field: "password", },
        { field: "Action", cellRenderer: ActionCellComponent }
    ];
    
    // public defaultColDef:ColDef={
    //     field:"userId",
    //     hide:true,
    //     suppressToolPanel: true
    // }
    

    constructor(private dialog: MatDialog,
        private http: HttpClient,
        private userService: UserService

    ) {
        

    }

    onGridReady(param: GridReadyEvent) {
      this.rowData$= this.getRowData();
      this.gridApi=param?.api
    }
    
    getRowData(): any {
       return new Promise((resolve)=>{
        this.userService.getAllUser().subscribe((userData)=>{
            resolve(userData);
        },(err)=>{
            resolve([])
        })
       })
    }


    
    setDataIntoRow() {
           this.userService.getAllUser().subscribe((res)=>{
            this.gridApi.setRowData(res);
           })
        }

    userInsertOrUpdate() {
        const dialogRef = this.dialog.open(UserRegistrationForm, {})
        dialogRef.afterClosed().subscribe(()=>{
            this.setDataIntoRow()
        })
    }



    
}

