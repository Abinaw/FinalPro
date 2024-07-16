import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-deatils',
  templateUrl: './user-deatils.component.html',
  styleUrls: ['./user-deatils.component.css','../../../../assets/CSS/ComponentCommDesign.css']
})
export class UserDeatilsComponent implements OnInit {
userName:string = '' 
role :string =''
    constructor(){
      
    }

    ngOnInit(): void {
        const token = localStorage.getItem('token');
      this.userNameSplit(token)
    }
    userNameSplit(token: string | null): void {
        try {
          if (token) {
            const parts = token.split('.');
            if (parts.length !== 3) {
              throw new Error('Invalid token');
            }
            const payload = JSON.parse(atob(parts[1]));
            this.userName =payload.sub
            this.role = payload.roles
            console.log(payload);
          } else {
            console.log('No token found');
          }
        } catch (e) {
          console.error('Failed to parse token', e);
        }
      }
//   role='Admin';
  name = localStorage.getItem("username") ? localStorage.getItem("username") : 'Jhon Doe';
  imgUrl:string = 'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800'
}
