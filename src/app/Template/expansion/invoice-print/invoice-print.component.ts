import { Component, Inject } from '@angular/core';
import { InvoicePaymentComponent } from '../../payments/invoice-payment/invoice-payment.component';
import { ActionPopComponent } from 'src/app/custom-components/action-cell/action-pop/action-pop.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IProCartEntity } from 'src/app/constants/interfaces/IProCartEntity';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentsService } from 'src/app/service/payments-service/payments.service';
import { ConfirmInvoiceService } from 'src/app/service/confirmInvoice-service/confirm-invoice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IInvoiceEntity } from 'src/app/constants/interfaces/InvoiceEntity';
import { IPaymentEntity } from 'src/app/constants/interfaces/IPaymentEntity';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.css']
})
export class InvoicePrintComponent {
    selectedCustomer!: any;
    productCartItems: IProCartEntity[] = [];
    paymentsList: IPaymentEntity[] = [];
    total: any;
    paidAmount!: number;
    balance!: number;
    today: any;
    invoiceData!: IInvoiceEntity[];
    invoiceId!: number;
    invoiceNumber!: number;
    isComplete!: boolean;

    constructor(
        // private productCartService: ProductCartService,
        // private custService :CustomerService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private matDialogRef: MatDialogRef<InvoicePrintComponent>,
        private matDialog: MatDialog,
        private paymentService: PaymentsService,
        // private invoiceService: InvoiceService,
        private confirmInvoice: ConfirmInvoiceService,
        private router: Router,
        private toastr: ToastrService
    ) {
        this.paidAmount = this.data.invoiceDataParam.paidAmount;
        this.balance = this.total - this.paidAmount;
        this.getinvoiceDetails();
        this.today = this.getInvoiceDate();
        this.productCartItems = GLOBAL_LIST.PRODUCTCART_DATA;
        this.calcValues(this.productCartItems);
        this.getACustomerData();
        this.getAllPayments();
    }
    ngOnInit(): void {
        //   console.log("productCart " , this.productCartItems.length)
    }
    getAllPayments() {
        this.paymentService.getAllPayments(this.invoiceId).subscribe((res) => {
            // GLOBAL_LIST.PAYMENTS_DATA = res.result;
            this.paymentsList = res.result;
            //#cmt calculatePaidAmount has been called once the paymentList is initialized, tried calling it after the
            // 'getAllPayemnt()' in the makePayment(), the call timing is missing
            this.calculatePaidAmount();
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

    openPDF() {
        const invoiceDOC = document.getElementById("invoice");
        if (invoiceDOC) {
            html2canvas(invoiceDOC, { scale: 3 }).then(canvas => {
        
                const imgData = canvas.toDataURL('image/jpeg');
        
                const pdf = new jsPDF('p', 'mm', 'a4');
        
                const imgWidth = pdf.internal.pageSize.getWidth();
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
                pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
                
                const pdfWindow = window.open('', '_blank');
              if (pdfWindow) {
                pdfWindow.document.open();
                pdfWindow.document.write('<html><head><title>Invoice</title></head><body>');
                pdfWindow.document.write('<img src="' + imgData + '" style="width:100%; height:auto;">');
                pdfWindow.document.write('</body></html>');
                pdfWindow.document.close();
        
                pdfWindow.onload = () => {
                  pdfWindow.print();
                };
        
                pdfWindow.onafterprint = () => pdfWindow.close();
              }
              });
            }
    }

    completeInvoice() {
        const extraData = {
            title: "Confirm Invoice",
            subTitle: "Do you want confirm this invoice?",
        };
        const popUpOpen = this.matDialog.open(ActionPopComponent, {
            data: extraData,
            panelClass: "custom-dialog-container",
        });

        popUpOpen.afterClosed().subscribe((state: boolean) => {
            if (!state) return;
            this.isComplete = true;
            this.confirmInvoice
                .addToConfirmInovie(this.invoiceId)
                .subscribe((res) => {
                    this.matDialogRef.close();
                    if (this.isComplete) {
                        this.router.navigate(["/dash-board/invoice/"]);
                        this.toastr.success(res.successMessage);
                    }
                });
        });
    }

    makePayment() {
        const extraData = {
            totalAmount: this.total,
            invoiceData: this.invoiceData,
            balanceAmount: this.total - this.paidAmount,
        };
        const invoicePaymentOpen = this.matDialog.open(
            InvoicePaymentComponent,
            { data: extraData, panelClass: ["custom-dialog-container"] }
        );
        invoicePaymentOpen.afterClosed().subscribe((res) => {
            this.getAllPayments();
        });
    }
}
