import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
    @Input() isSwitched!: boolean;
    constructor(private router: Router,private authService:AuthService) {

     }
    
    logout() {
        console.log("logout")
        this.authService.logout();
      }
  
  name = "Krishnakabilan";
  role = "admin";
   
}
