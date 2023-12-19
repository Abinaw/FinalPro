import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'FinalPro';
    isLoginPageAvail: boolean = true;



    constructor(
        private router: Router) {

    }
    ShowSidebar(): any {
        const currentRoute = this.router.url;//login
        if (['/login'].includes(currentRoute)) {
            this.isLoginPageAvail = false;
            return false;
        } else {
            this.isLoginPageAvail = true;
            return true;
        }



    }
}
