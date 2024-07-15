import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/service/notification-service/notification.service';
import { NotifiExpansionComponent } from './notifi-expansion/notifi-expansion.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent  implements OnInit {

    @Input() notifications!: any[];
  
    constructor( public matDialog: MatDialog) {}
  
    ngOnInit(): void {
   
    }


    openNotification() {
        // const extraData = this.notifications 
        const openNotifi = this.matDialog.open(NotifiExpansionComponent, {data: this.notifications, panelClass:""}); 
        }
  }
