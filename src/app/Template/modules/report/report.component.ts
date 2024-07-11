import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { ConfirmInvoiceService } from 'src/app/service/confirmInvoice-service/confirm-invoice.service';
import { ConfirmPurchaseAndCartServiceService } from 'src/app/service/confirmPurchase-service/confirm-purchase-and-cart-service.service';
import { CustomerService } from 'src/app/service/customer-service/customer.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css','../../../../assets/CSS/ComponentCommDesign.css']
})
export class ReportComponent {
    selectedCard: any;
    reportName :string =''
    reportView: boolean = true
    constructor(private router:Router,
        private confirmedInvoiceService: ConfirmInvoiceService,
        private confirmedPurchaseInvoiceService: ConfirmPurchaseAndCartServiceService,
        private customerService: CustomerService,

     ){
        this.getAllConfirmInvoice()
        this.getAllConfirmPurchaseInvoice()
        this.getAllCustomers()
    }
  
    Cards = [
        {
            name: "Stock Report",
        },
        {
            name: "Invoice Report",
        },
        {
            name: "Purchase Report",
       
        },
        {
            name: "Payments Report",
      
        },
        {
            name: "Vendor Report",
       
        },
        {
            name: "Customer Report",
      
        }
    ];

    setValue(name:string){
        this.reportName = name
        this.reportView = false
    }

    getAllConfirmInvoice() {
        this.confirmedInvoiceService.getAllConfirmedInvoices().subscribe((invoiceData) => {
          GLOBAL_LIST.CONFIRM_SALES_DATA = invoiceData?.result
        })
    }

    getAllConfirmPurchaseInvoice(){
            this.confirmedPurchaseInvoiceService.getAllConfirmPurchaseInvoices().subscribe((purchaseData)=>{
                GLOBAL_LIST.CONFIRM_PURCHASE_DATA = purchaseData?.result
            })
    }

    getAllCustomers(){
        this.customerService.getAll().subscribe((customerData)=>{
            GLOBAL_LIST.CUSTOMER_DATA = customerData
        })
}
}
