import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { ConfirmInvoiceService } from 'src/app/service/confirmInvoice-service/confirm-invoice.service';

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
     ){
        this.getAllConfirmInvoice()
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
            route: "/dash-board/vendor",
        },
        {
            name: "Payments Report",
            route: "/dash-board/commonPayments",
        },
        {
            name: "Vendor Report",
            route: "/dash-board/return",
        },
        {
            name: "Customer Report",
            route: "/dash-board/stock",
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
}
