import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'FinalPro';
    isLoginPageAvail: boolean = true;
    showClose:boolean =false


    constructor(
        private router: Router) {
    }
    
    ShowSidebarAndNotifiBar(): any {
        
        const currentRoute = this.router.url;//login
        // if (['/login'].includes(currentRoute)) {
        if(currentRoute.includes('/login')){
            this.isLoginPageAvail = true;
            return false;
        }else{
            this.isLoginPageAvail = false;
            return true;
        }
    }


    showCloseIcon(){
        const currentRoute = this.router.url;
        if(['/login','/dash-board'].includes(currentRoute)){
           this.showClose= false
            return false;
        } else {
           this.showClose = true
            return true;
        }
    }


    
}
