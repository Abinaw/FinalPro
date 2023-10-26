import {Component} from '@angular/core';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'app-dashboard-cards',
  templateUrl: 'dashboard-cards.component.html',
  styleUrls: ['dashboard-cards.component.css','../../../assets/CSS/ComponentCommDesign.css'],
})
export class DashboardCardsComponent {

  Cards=[
    {
      name:'Customer' ,imgUrl:'../../assets/New Set/customer.jpg'
    },
    {
      name:'User' ,imgUrl:'../../assets/New Set/user.jpg'
    },
    {
      name:'Vendor' ,imgUrl:'../../assets/New Set/vendor.jpg'
    },
    {
      name:'Sales' ,imgUrl:'../../assets/New Set/Sales.jpg'
    },
    {
      name:'Employee' ,imgUrl:'../../assets/New Set/Employee.jpg'
    },
    {
      name:'Stock' ,imgUrl:'../../assets/New Set/Stock.jpg'
    },
    {
      name:'Purchase' ,imgUrl:'../../assets/New Set/Purchase.jpg'
    },
    {
      name:'Report' ,imgUrl:'../../assets/New Set/Report.jpg'
    }

  ]

  
}
