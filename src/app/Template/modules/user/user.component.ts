import { Component } from '@angular/core';
import userData from "../../../../assets/json/users.json"
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserRegistrationComponent } from '../../auth-forms/user-registration/user-registration.component';
import { SignUpComponent } from '../../auth-forms/sign-up/sign-up.component';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css','../../../../assets/CSS/TableDesign.css','../../../../assets/CSS/ComponentCommDesign.css']

})
export class UserComponent {

  constructor(private dialog:MatDialog){

  }

  userInsertOrUpdate(){
      this.dialog.open(SignUpComponent)

  }


}
