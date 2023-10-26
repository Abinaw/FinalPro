import { Component } from '@angular/core';
import userData from "../../../../assets/json/users.json"

export interface userDetails{

  name:string;
  job: string;
  id: string;
  createdAt:string;
}


const ELEMENT_DATA : userDetails[] = userData;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css','../../../../assets/CSS/TableDesign.css','../../../../assets/CSS/ComponentCommDesign.css']  

})
export class UserComponent {
dataSource = ELEMENT_DATA;
displayedColumn = ["Name","Job","Id","CreatedAt"];
}
