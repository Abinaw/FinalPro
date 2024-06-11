import { Component, Input } from '@angular/core';
import { ActionPopComponent } from '../action-pop/action-pop.component';
import { GridApi, ICellRendererParams } from 'ag-grid';
import { InvoicePaymentComponent } from 'src/app/Template/payments/invoice-payment/invoice-payment.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmSalesInvociePaymentService } from 'src/app/service/confirmPaymentServices/ConfirmSalesInvoiceService/confirm-sales-invocie-payment.service';
import { ConfirmPurchasePaymentService } from 'src/app/service/confirmPaymentServices/ConfirmedPurchaseInvoiceServices/confirm-purchase-payment.service';
import { CommonPaymentsComponent } from 'src/app/Template/modules/common-payments/common-payments.component';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { IProCartEntity } from 'src/app/constants/interfaces/IProCartEntity';
@Component({
  selector: 'app-payment-action',
  templateUrl: './payment-action.component.html',
  styleUrls: ['./payment-action.component.css']
})
export class PaymentActionComponent {
    dataFromRow: any;
    gridApi: GridApi | any = {};
    params: any;
   

    constructor( private matDialog: MatDialog,
        private confirmSalesInvociePaymentService :ConfirmSalesInvociePaymentService,
        private confirmPurchaseInvociePayService:ConfirmPurchasePaymentService
    ){
        
    }

    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.dataFromRow = params && params.data ? params.data : {};
        this.gridApi = params.api;
     }

  
    makePayment() {
      
        if(this.params.actionName === "purchaseInvoice"){
            this.matDialog.open(InvoicePaymentComponent,{data:this.dataFromRow,panelClass:['custom-dialog-container']})
          
            
        }else if(this.params.actionName ==="salesInvoice"){
            
            this.matDialog.open(InvoicePaymentComponent,{data:this.dataFromRow,panelClass:['custom-dialog-container']})
        }
        // const extraData = {
        //     // totalAmount: this.totalNetAmount,
        //     // invoiceData: this.invoiceData,
        // };
        // const invoicePaymentOpen = this.matDialog.open(
        //     InvoicePaymentComponent,
        //     { data: extraData, panelClass: ["custom-dialog-container"] }
        // );
        // invoicePaymentOpen.afterClosed().subscribe((res) => {
        //     this.getAllPayments();
          
        // });
    }

    // getAllPayments() {
    
    //     this.paymentService.getAllPayments(this.invoiceId).subscribe((res) => {
    //         GLOBAL_LIST.PAYMENTS_DATA = res.result;
           
    //     });
    // }




//      public setDataIntoRow() {
//         this.custService.getAll().subscribe((retData)=>{
//             this.gridApi.setRowData(retData)
//         })
//     }

//     openDelDialog(): void {
        
//         const extraData = {
//             title : "Delete Customer",
//             subTitle: "Do you want to delete this customer?",
//         }
//         const deletePop= this.matDialog.open(ActionPopComponent, {data: extraData, panelClass:"custom-dialog-container"});
        
//         deletePop.afterClosed().subscribe((state:boolean) => {
//             if(!state)return;

            
//             this.custService.delete(this.dataFromRow.custId).subscribe((res)=>{
//                 this.toastr.success(res)
//                 this.setDataIntoRow();
//             })
//         })
       
//     }
    
//     updateFormTrigger() {
//         const data={
//             title: "Update",
//             custData:this.dataFromRow
//         }
//             const dialogRef = this.matDialog.open(CustomerFormComponent, {data, panelClass:"custom-dialog-container"});
//             dialogRef.afterClosed().subscribe(()=>{
//                 this.setDataIntoRow()
//             })
//         }
}
