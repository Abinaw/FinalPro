import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserRegistrationComponent } from '../../auth-forms/user-registration/user-registration.component';
import userDta from '../../../../assets/json/users.json'
import { AgGridModule } from 'ag-grid-angular';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css','../../../../assets/CSS/TableDesign.css','../../../../assets/CSS/ComponentCommDesign.css']

})
export class UserComponent {
    
rowData: any[]=[
    {
        "Firstname":"Kabil",
        "Lastname":"Loganathan",
        "Username":"Kabil19",
        "Email":"Kabil@gmail.com",
        "Gender":"Male",
        "Role":"Admin",
        "Password":"XXXXX"
     },
     {
        "Firstname":"Yalu",
        "Lastname":"Loganathan",
        "Username":"Yalu19",
        "Email":"Yalu@gmail.com",
        "Gender":"Female",
        "Role":"Admin",
        "Password":"XXXXX"
     },

]



  constructor(private dialog:MatDialog){

  }

  userInsertOrUpdate(){
    const dialogRef =  this.dialog.open(UserRegistrationComponent , {width:'auto'})
  }

}
