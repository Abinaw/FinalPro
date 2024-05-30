import { Component } from '@angular/core';

@Component({
  selector: 'app-user-deatils',
  templateUrl: './user-deatils.component.html',
  styleUrls: ['./user-deatils.component.css','../../../../assets/CSS/ComponentCommDesign.css']
})
export class UserDeatilsComponent {

  role='Admin';
  name = localStorage.getItem("userName") ? localStorage.getItem("userName") : 'Jhon Doe';
  imgUrl:string = 'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800'
}
