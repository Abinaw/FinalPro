import {Component, Input} from '@angular/core';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'app-dashboard-cards',
  templateUrl: 'dashboard-cards.component.html',
  styleUrls: ['dashboard-cards.component.css'],
})
export class DashboardCardsComponent {
    @Input() isSwitched!: boolean;

  
  Cards=[
    {
      name:'Customer' ,imageUrl:"../../assets/New Set/customer.png",route:'customer'
    },
    {
      name:'User' ,imageUrl:"../../assets/New Set/user.png",route:'user'
    },
    {
      name:'Vendor' ,imageUrl:"../../assets/New Set/vendor.png",route:'vendor'
    },
    {
      name:'Sales' ,imageUrl:"../../assets/New Set/sales.png",route:'sales'
    },
    {
      name:'Return' ,imageUrl:"../../assets/New Set/return.png",route:'return'
    },
    {
      name:'Stock' ,imageUrl:"../../assets/New Set/stock.png",route:'stock'
    },
    {
      name:'Purchase' ,imageUrl:"../../assets/New Set/purchase.png",route:'purchase'
    },
    {
      name:'Category' ,imageUrl:"../../assets/New Set/category.png",route:'category'
    },
    {
      name:'Invoice' ,imageUrl:"../../assets/New Set/invoice.png",route:'invoice'
    },
    {
        name:'Report' ,imageUrl:"../../assets/New Set/report.png",route:'report'
      },
    
      
      
    
  ]





}
