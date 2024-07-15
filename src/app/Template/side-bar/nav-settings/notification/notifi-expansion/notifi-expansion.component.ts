import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notifi-expansion',
  templateUrl: './notifi-expansion.component.html',
  styleUrls: ['./notifi-expansion.component.css']
})
export class NotifiExpansionComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any){
        console.log(this.data)
    }

    

}
