import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { ProductCartService } from 'src/app/service/productCart-service/product-cart.service';
import { ICustomerEntity } from '../../constants/interfaces/CustomerEntity';
import { CustomerService } from 'src/app/service/customer-service/customer.service';
import { IProCartEntity } from '../../constants/interfaces/IProCartEntity';
import { InvoicePaymentComponent } from '../payments/invoice-payment/invoice-payment.component';
import { IInvoiceEntity } from '../../constants/interfaces/InvoiceEntity';
import { PaymentsService } from 'src/app/service/payments-service/payments.service';
import { IPaymentEntity } from '../../constants/interfaces/IPaymentEntity';
import { InvoiceService } from 'src/app/service/invoice-service/invoice.service';

@Component({
  selector: 'app-invoice-template-for-customer',
  templateUrl: './invoice-template-for-customer.component.html',
  styleUrls: ['./invoice-template-for-customer.component.css']
})
export class InvoiceTemplateForCustomerComponent implements OnInit{

 

selectedCustomer! : any
productCartItems!: IProCartEntity[]
total: any
paidAmount!: number
today: any ;
invoiceData! :IInvoiceEntity[]
invoiceId!:number
invoiceNumber!:number
    constructor( 
        private productCartService: ProductCartService, 
        private custService :CustomerService,
        @Inject(MAT_DIALOG_DATA) public data: any, 
        private matDialogRef:MatDialogRef<InvoiceTemplateForCustomerComponent>,
        private matDialog: MatDialog,
        private paymentService: PaymentsService,
        private invoiceService: InvoiceService
    ){
     
       this.getCartItems()
       this.calculatePaidAmount()
       this.today = this.getInvoiceDate()
       this.productCartItems = GLOBAL_LIST.PRODUCTCART_DATA
       this.calcValues(this.productCartItems)
       this.getACustomerData()
    }
    ngOnInit(): void {
        // console.log("invoiceData Values ",this.invoiceData)
        this.getAllPayments()
        this.calculatePaidAmount()
        this.getCartItems()
    }
    getAllPayments(){
        this.paymentService.getAllPayments(this.invoiceId).subscribe(res=>{
           GLOBAL_LIST.PAYMENTS_DATA = res?.result
        })
    }
    
    calculatePaidAmount(){
        const paymentList = GLOBAL_LIST.PAYMENTS_DATA
        this.paidAmount= paymentList.reduce((accumulator,currentValue)=>accumulator+currentValue.paidAmount,0)
    }

    getACustomerData(){
        this.selectedCustomer  = this.data.invoiceDataParam.customerOBJ
    }

    getCartItems(){
        this.invoiceData = this.data.invoiceDataParam
        this.invoiceNumber = this.data.invoiceDataParam.tempInvoiceNumber
        this.invoiceId = this.data.invoiceDataParam.tempInvoiceId
    }

    calcValues(list:IProCartEntity[]){
        this.total = list.reduce((subTotal,item)=>subTotal+item.netAmount,0)       
    }

  

    getInvoiceDate(){
        const now = new Date()
        const day = now.getDate()
        const month = now.getMonth()
        const year = now.getFullYear()
        return `${day}-${month}-${year}`;
    }
 
    openPDF(){
    
       const invoiceDOC = document.getElementById('invoice');
       
       if(invoiceDOC){
        
            html2canvas(invoiceDOC, {scale:2}).then((canvas)=>{
                const img = canvas.toDataURL('image/jpeg');
                const newPDF = new jsPDF('p','mm','a4');
                const imgWidth = newPDF.internal.pageSize.getWidth();
                const imgHeight = (canvas.height * imgWidth)/ canvas.width;
                newPDF.addImage(img, 'JPEG',0, 0, imgWidth, imgHeight);
                newPDF.save(this.invoiceNumber+'.pdf');
            })
       } 
    
    }


    makePayment() {
    
        const extraData = {
           totalAmount : this.total,
           invoiceData : this.invoiceData
        }
       const invoicePaymentOpen = this.matDialog.open(InvoicePaymentComponent, {data:extraData,panelClass:['custom-dialog-container']})
       invoicePaymentOpen.afterClosed().subscribe(res=>{
       this.getAllPayments()
       this.calculatePaidAmount()
       })
      
    }

    getTheInvoiceData(){
        this.invoiceService.getAll().subscribe(invoiceData=>{
            GLOBAL_LIST.INVOICE_DATA = invoiceData
            GLOBAL_LIST.INVOICE_DATA = GLOBAL_LIST.INVOICE_DATA.filter(list=>list.tempInvoiceId === this.invoiceId)       
        })       
    }

}
