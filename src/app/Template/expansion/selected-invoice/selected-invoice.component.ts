import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductSelectionToCartComponent } from '../product-selection-to-cart/product-selection-to-cart.component';
import { StockService } from 'src/app/service/stock-service/stock.service';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { CetegoryService } from 'src/app/service/category-service/cetegory.service';

@Component({
  selector: 'app-selected-invoice',
  templateUrl: './selected-invoice.component.html',
  styleUrls: ['./selected-invoice.component.css']
})
export class SelectedInvoiceComponent {

    customerName!:string;
    custId!:number;
    custContact!:number;
    constructor(
        private catService : CetegoryService,
        private stockService: StockService,
        private route:ActivatedRoute,
        private matDialog:MatDialog
    ){
        this.getAllStockData()
        this.route.queryParams.subscribe(params=>{
            let dataString = params['data']
            dataString = JSON.parse(dataString);
            this.customerName = dataString.customerOBJ.custName
            this.custId = dataString.customerOBJ.custId
            this.custContact = dataString.customerOBJ.contact
        })
    }

    addProducts() {
        const extraData={
            title:"Products"
        }
        const showAvailableProducts = this.matDialog.open(ProductSelectionToCartComponent,{height:"100%",width:"100%"})
        showAvailableProducts.afterClosed().subscribe(res=>{
            // console.log("these are the products available")
        })
    }
    getAllStockData() {
        this.stockService.getAll().subscribe(res => {
            GLOBAL_LIST.STOCK_DATA = res
        })

        this.catService.getAll().subscribe(res => {
            GLOBAL_LIST.CATEGORY_DATA = res
        })
        
    }

}
