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
      name:'Customer' ,imageUrl:"../../assets/New Set/customer.png",route:'/dash-board/customer'
    },
    {
      name:'User' ,imageUrl:"../../assets/New Set/user.png",route:'/dash-board/user'
    },
    {
      name:'Vendor' ,imageUrl:"../../assets/New Set/vendor.png",route:'/dash-board/vendor'
    },
    {
      name:'Sales' ,imageUrl:"../../assets/New Set/sales.png",route:'/dash-board/sales'
    },
    {
      name:'Return' ,imageUrl:"../../assets/New Set/return.png",route:'/dash-board/return'
    },
    {
      name:'Stock' ,imageUrl:"../../assets/New Set/stock.png",route:'/dash-board/stock'
    },
    {
      name:'Purchase' ,imageUrl:"../../assets/New Set/purchase.png",route:'/dash-board/purchase'
    },
    {
      name:'Category' ,imageUrl:"../../assets/New Set/category.png",route:'/dash-board/category'
    },
    {
      name:'Invoice' ,imageUrl:"../../assets/New Set/invoice.png",route:'/dash-board/invoice'
    },
    {
        name:'Report' ,imageUrl:"../../assets/New Set/report.png",route:'/dash-board/report'
      },
    
      
      
    
  ]





}
