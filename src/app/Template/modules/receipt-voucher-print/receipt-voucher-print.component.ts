import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-receipt-voucher-print',
  templateUrl: './receipt-voucher-print.component.html',
  styleUrls: ['./receipt-voucher-print.component.css']
})
export class ReceiptVoucherPrintComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data:any){
        console.log("ReceiptVoucherPrintComponent ",this.data)
        if(this.data.confirmPurchaseOBJ){
            console.log("Voucher")
        }else if(this.data.confirmInvoiceOBJ){
            console.log("Receipt")
        }
    }

}
