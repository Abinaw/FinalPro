import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
    @Input() isSwitched!: boolean;
    constructor(private router: Router) {

     }
    
    logout() {
        localStorage.clear
        this.router.navigateByUrl('');
      }
  
  name = "Krishnakabilan";
  role = "admin";
   
}
