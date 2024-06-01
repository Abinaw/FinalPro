import {Component, Input, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { VendorService } from 'src/app/service/vendor-service/vendor.service';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'app-dashboard-cards',
  templateUrl: 'dashboard-cards.component.html',
  styleUrls: ['dashboard-cards.component.css'],
})
export class DashboardCardsComponent  {
    @Input() isSwitched!: boolean;

constructor( private vendorService: VendorService,){
this.loadAllVendor();
}


loadAllVendor(){
    this.vendorService.getAll().subscribe(res=>{
        GLOBAL_LIST.VENDOR_DATA = res
        
})
}

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
