import {Component} from '@angular/core';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'app-dashboard-cards',
  templateUrl: 'dashboard-cards.component.html',
  styleUrls: ['dashboard-cards.component.css'],
})
export class DashboardCardsComponent {


  Cards=[
    {
      name:'Customer' ,imageUrl:"../../assets/New Set/customer.jpg",route:'customer'
    },
    {
      name:'User' ,imageUrl:"../../assets/New Set/user.jpg",route:'user'
    },
    {
      name:'Vendor' ,imageUrl:"../../assets/New Set/vendor.jpg",route:'vendor'
    },
    {
      name:'Sales' ,imageUrl:"../../assets/New Set/sales.jpg",route:'sales'
    },
    {
      name:'Return' ,imageUrl:"../../assets/New Set/return.jpg",route:'return'
    },
    {
      name:'Stock' ,imageUrl:"../../assets/New Set/stock.jpg",route:'stock'
    },
    {
      name:'Purchase' ,imageUrl:"../../assets/New Set/purchase.jpg",route:'purchase'
    },
    {
      name:'Category' ,imageUrl:"../../assets/New Set/category.jpg",route:'category'
    },
    {
      name:'Invoice' ,imageUrl:"../../assets/New Set/invoice.jpg",route:'invoice'
    },
    {
        name:'Report' ,imageUrl:"../../assets/New Set/report.jpg",route:'report'
      }

  ]




}
