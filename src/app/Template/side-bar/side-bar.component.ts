import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { INotificationEntity } from 'src/app/constants/interfaces/INotificationEntity';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NotificationService } from 'src/app/service/notification-service/notification.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
    @Input() isSwitched!: boolean;
    dueDateNotificationData: INotificationEntity | null = null;
    constructor(
        private router: Router,
        private authService:AuthService,
        private notificationService: NotificationService,
        private cdr: ChangeDetectorRef) {

     }
     ngOnInit(): void {
        this.notificationService.dueDateDataSubject$.subscribe(data=>{
          this.dueDateNotificationData = data;
          this.cdr.detectChanges();
        })
      }
    logout() {
        console.log("logout")
        this.notificationService.clearData();
        this.authService.logout();
      }
  
 
   
}
