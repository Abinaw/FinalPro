import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NotificationService } from 'src/app/service/notification-service/notification.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
    @Input() isSwitched!: boolean;
    salesDueChequeData: any[] = [];
    purchaseDueChequeData: any[] = [];
    constructor(private router: Router,private authService:AuthService,private notificationService: NotificationService,private cdr: ChangeDetectorRef) {

     }
     ngOnInit(): void {
        this.notificationService.duePurchaseChequeData$.subscribe(data=>{
          this.purchaseDueChequeData = data;
          this.cdr.detectChanges();
        })
        this.notificationService.dueSalesChequeData$.subscribe(data => {
          this.salesDueChequeData = data;
          this.cdr.detectChanges();
        });
      }
    logout() {
        console.log("logout")
        this.notificationService.clearData();
        this.authService.logout();

      }
  
 
   
}
