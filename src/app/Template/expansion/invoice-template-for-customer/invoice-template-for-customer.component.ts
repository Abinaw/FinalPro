import { Component, Inject, Input, OnInit } from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from "@angular/material/dialog";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { GLOBAL_LIST } from "src/app/constants/GlobalLists";
import { ProductCartService } from "src/app/service/productCart-service/product-cart.service";
import { ICustomerEntity } from "../../../constants/interfaces/CustomerEntity";
import { CustomerService } from "src/app/service/customer-service/customer.service";
import { IProCartEntity } from "../../../constants/interfaces/IProCartEntity";
import { InvoicePaymentComponent } from "../../payments/invoice-payment/invoice-payment.component";
import { IInvoiceEntity } from "../../../constants/interfaces/InvoiceEntity";
import { PaymentsService } from "src/app/service/payments-service/payments.service";
import { IPaymentEntity } from "../../../constants/interfaces/IPaymentEntity";
import { InvoiceService } from "src/app/service/invoice-service/invoice.service";
import { ActionPopComponent } from "src/app/custom-components/action-cell/action-pop/action-pop.component";
import { ConfirmInvoiceService } from "src/app/service/confirmInvoice-service/confirm-invoice.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-invoice-template-for-customer",
    templateUrl: "./invoice-template-for-customer.component.html",
    styleUrls: ["./invoice-template-for-customer.component.css"],
})
export class InvoiceTemplateForCustomerComponent implements OnInit {
    selectedCustomer!: any;
    productCartItems: IProCartEntity[] = [];
    paymentsList: IPaymentEntity[] = [];
    total: any;
    paidAmount!: number;
    // balance!: number;
    today: any;
    invoiceData!: IInvoiceEntity[];
    invoiceId!: number;
    invoiceNumber!: number;
    isComplete!: boolean;
    // @Input("items") productItems  :any
    // @Input() payList  :any
    constructor(
      
        @Inject(MAT_DIALOG_DATA) public data: any,
        private matDialogRef: MatDialogRef<InvoiceTemplateForCustomerComponent>,
        private matDialog: MatDialog,
        private paymentService: PaymentsService,
        // private confirmInvoice: ConfirmInvoiceService,
        // private router: Router,
        private toastr: ToastrService,
        // private invocieService: InvoiceService
    ) {
        this.paymentsList = GLOBAL_LIST.PAYMENTS_DATA 
        // this.paidAmount = this.data.invoiceDataParam.paidAmount;
        // this.balance = this.total - this.paidAmount;
        this.getinvoiceDetails();
        this.today = this.getInvoiceDate();
        this.productCartItems = GLOBAL_LIST.PRODUCTCART_DATA;
        this.calcValues(this.productCartItems);
        this.getACustomerData();
        // console.log(this.productCartItems)
       
        
    }
    ngOnInit(): void {
        this.calculatePaidAmount();
  
    }

    
    

    getAllPayments() {
     
        this.paymentService.getAllPayments(this.data.invoiceDataParam.tempInvoiceId).subscribe((res) => {
            // GLOBAL_LIST.PAYMENTS_DATA = res.result;
            this.paymentsList = res.result;
            //#cmt calculatePaidAmount has been called once the paymentList is initialized, tried calling it after the
            // 'getAllPayemnt()' in the makePayment(), the call timing is missing
            // this.calculatePaidAmount();
        });
    }

    calculatePaidAmount() {
        if (this.paymentsList?.length > 0) {
            this.paidAmount = this.paymentsList.reduce(
                (accumulator, currValue) => accumulator + currValue.paidAmount,
                0
            );
        }
    }

    getACustomerData() {
        this.selectedCustomer = this.data.invoiceDataParam.customerOBJ;
    }

    getinvoiceDetails() {

        this.invoiceData = this.data.invoiceDataParam;
        this.invoiceNumber = this.data.invoiceDataParam.tempInvoiceNumber;
        this.invoiceId = this.data.invoiceDataParam.tempInvoiceId;
    }

    calcValues(list: IProCartEntity[]) {
        this.total = list.reduce(
            (subTotal, item) => subTotal + item.netAmount,0);
    }

    getInvoiceDate() {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        return `${day}-${month}-${year}`;
    }

  
  
}
