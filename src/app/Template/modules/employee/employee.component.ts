import { Component } from '@angular/core';
import employee from '../../../../assets/json/employee.json'


export interface EmployeeData {
  Id :number;
  FirstName : string; 
  LastName : string;
  Email : string;
  Gender : string;
  JobTitle : string;
  Action:string;
}

const ELEMENT_DATA :EmployeeData[]=employee;


  @Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css','../../../../assets/CSS/TableDesign.css','../../../../assets/CSS/ComponentCommDesign.css']
  })

  export class EmployeeComponent {
    
    displayedColumns=["Id","FirstName","LastName","Email","Gender","JobTitle","Action"];
    dataSource = ELEMENT_DATA;
  }
