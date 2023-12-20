import { Component, ViewChild, } from '@angular/core';
import { MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { UserRegistrationForm } from '../../auth-forms/registration-form/userRegistration-form.component';
import userDta from '../../../../assets/json/users.json'
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActionCellComponent } from 'src/app/custom-components/action-cell/action-cell.component';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { OnInit } from '@angular/core';
import { UserService } from 'src/app/service/userService/user.service';
import { ICellRendererParams } from 'ag-grid';

@Component({
    selector: 'app-user',
    templateUrl: './userData.component.html',
    styleUrls: ['./userData.component.css',],
})
export class UserDataComponent {
    rowData$!: Observable<any[]>;
    @ViewChild(AgGridAngular)
    agGrid!: AgGridAngular
    gridApi: GridApi | any = {}
    public rowSelection: 'single' | 'multiple' = 'single';
    isInsert!:true;
    findByName : string=""
    public columnDef: ColDef[] = [
        // 
        { field: "userId", width: 90, hide: true, suppressColumnsToolPanel: true },
        { field: "firstname", },
        { field: "lastname", },
        { field: "username", },
        { field: "role", },
        { field: "email",width:250 },
        { field: "gender",},
        { field: "password", hide: true, suppressColumnsToolPanel: true },
        { field: "confirmPw", hide: true, suppressColumnsToolPanel: true },
        { field: "Action",width: 90, cellRenderer: ActionCellComponent, }
    ];

    constructor(
        private dialog: MatDialog,
        private userService: UserService,
    ) { }



    onGridReady(param: GridReadyEvent) {
        this.rowData$ = this.getRowData();
        this.gridApi = param?.api
    }

    onCellClicked(cellClickedEvent: CellClickedEvent) {
        //    console.log(cellClickedEvent)
    }

    private getRowData(): any {
        return new Promise((resolve) => {
            this.userService.getAllUser().subscribe((userData) => {
                resolve(userData);
            }, (err) => {
                resolve([])
            })
        })
    }

    // every Time delete,add,update have been used this specific function should be used by classes(popups or etc) so kept public 
    // or else this should be created for every class 
    public setDataIntoRow() {
        this.userService.getAllUser().subscribe((res) => {
            this.gridApi.setRowData(res);
        })
    }


    insertTrigger() {
        const extraData={
            title:"Insert"
        }
        const openForm = this.dialog.open(UserRegistrationForm,{data:extraData})
        openForm.afterClosed().subscribe(() => {
            this.setDataIntoRow()
        })
    }

    searchDataInRows()
    {
       this.gridApi.setQuickFilter(this.findByName)
        // console.log(this.findByName)
        // this.userService.findData(this.findByName).subscribe(res=>{
        //   this.gridApi.setRowData(res)     
        //   console.log(this.gridApi)
        // });
    
    }





}

