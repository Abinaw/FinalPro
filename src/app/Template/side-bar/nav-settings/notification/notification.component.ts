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

    @Input() purchaseNotifications!: any[];
    @Input() salesNotifications!: any[];
  
    constructor( public matDialog: MatDialog) {}
  
    ngOnInit(): void {
   
    }


    openNotification() {
        const data = {'purchase':this.purchaseNotifications , 'sales':this.salesNotifications}
        const openNotifi = this.matDialog.open(NotifiExpansionComponent, {data:data, panelClass:""}); 
        }
  }
