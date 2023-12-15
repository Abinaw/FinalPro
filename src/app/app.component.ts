import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinalPro';


  constructor(
    private router:Router)
    {

    }
    showSidebar():any {
      const currentRoute = this.router.url;
     return !['/login', '/signup'].includes(currentRoute);

    }
}
