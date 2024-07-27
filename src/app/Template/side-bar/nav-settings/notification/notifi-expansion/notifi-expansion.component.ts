import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notifi-expansion',
  templateUrl: './notifi-expansion.component.html',
  styleUrls: ['./notifi-expansion.component.css']
})
export class NotifiExpansionComponent {
receivedData:any[]
    constructor(@Inject(MAT_DIALOG_DATA) public data: any){
        this.receivedData =data
        console.log("data ",this.data)
    }
}
