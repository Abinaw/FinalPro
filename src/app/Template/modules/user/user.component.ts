import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserRegistrationComponent } from '../../auth-forms/user-registration/user-registration.component';
import userDta from '../../../../assets/json/users.json'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActionCellComponent } from 'src/app/action-cell/action-cell.component';

import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css',],
  

})
export class UserComponent   {
    
rowData$!:Observable<any[]>;


public columnDef:ColDef[]=[
{field:"firstname",},
{field:"lastname",},
{field:"username",},
{field:"email",},
{field:"gender",},
{field:"role",},
{field:"password",},
{field:"Action",cellRenderer:ActionCellComponent }
];



  constructor(private dialog:MatDialog,
    private http:HttpClient){

  }

  ngOnInit(){
        this.rowData$=this.http.get<any[]>("http://localhost:8080/user/getAll");
    
    }

    userInsertOrUpdate(){
        const dialogRef =  this.dialog.open(UserRegistrationComponent , {})
    }

}

