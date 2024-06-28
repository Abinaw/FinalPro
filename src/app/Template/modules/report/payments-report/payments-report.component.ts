import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable, map, startWith } from 'rxjs';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { IConfirmInvoiceEntity } from 'src/app/constants/interfaces/IConfirmInvoiceEntity';
import { IConfirmPurchaseEntity } from 'src/app/constants/interfaces/IConfirmPurchaseEntity';
import { IDataToSet } from 'src/app/constants/interfaces/IDataToSetForReports';
import { IReceiptEntity } from 'src/app/constants/interfaces/IReceiptEntity';
import { IVoucherEntity } from 'src/app/constants/interfaces/IVoucherEntity';
import { ConfirmSalesInvociePaymentService } from 'src/app/service/confirmPaymentServices/ConfirmSalesInvoiceService/confirm-sales-invocie-payment.service';
import { ConfirmPurchasePaymentService } from 'src/app/service/confirmPaymentServices/ConfirmedPurchaseInvoiceServices/confirm-purchase-payment.service';
import { ReportsServiceService } from 'src/app/service/reports-service/reports-service.service';

@Component({
    selector: 'app-payments-report',
    templateUrl: './payments-report.component.html',
    styleUrls: ['./payments-report.component.css']
})
export class PaymentsReportComponent {
    isReportGenerated!: boolean;
    selectedValue: string = '';
    filterOptions!: Observable<any[]>
    // voucherNoDataList!: IVoucherEntity[]
    // receiptNoDataList!: IReceiptEntity[]
    confirmPurchaseDataList!: IConfirmPurchaseEntity[]
    confirmSalesInvoiceDataList!: IConfirmInvoiceEntity[]
    invoiceId!: number
    dataToSet: IDataToSet = { reportType: '', result: null, error: null };
    reports: any[] = [
        { value: 'voucherReprint', viewValue: 'Voucher Re-print' },
        { value: 'receiptReprint', viewValue: 'Receipt Re-print' },
        { value: 'allPaymentsReports', viewValue: 'All Payments Report' },
        { value: 'customPaymentsReport', viewValue: 'Custom Payments Report' },
    ];
    invoiceSelection: FormGroup;
    refNoControl = new FormControl('');
    range: FormGroup;

    constructor(

        private cdr: ChangeDetectorRef,
        private reportsService: ReportsServiceService,
        private confirmSalesPurchasePaymentsService: ConfirmSalesInvociePaymentService,
        private confirmPurchasePaymentService: ConfirmPurchasePaymentService,

    ) {
        this.confirmPurchaseDataList = GLOBAL_LIST.CONFIRM_PURCHASE_DATA
        this.confirmSalesInvoiceDataList = GLOBAL_LIST.CONFIRM_SALES_DATA
        this.invoiceSelection = new FormGroup({
            refNo: new FormControl,
            selectedOpt: new FormControl,
        });

        this.range = new FormGroup({
            start: new FormControl({}, [Validators.required,]),
            end: new FormControl({}, [Validators.required,]),
        });

    }

    ngOnInit() {
        this.isReportGenerated = false
       
    }


    check(){
        this.filterOptions = this.refNoControl.valueChanges.pipe(
            startWith(""),
            map((value) => this.listFilter(value || ""))
        );
    }

    private listFilter(value: string): any[] {
        let reportChoise = this.invoiceSelection.get('selectedOpt')
        const searchValue = value.toString().toLowerCase();
        console.log(reportChoise?.value)
        if (reportChoise?.value === "voucherReprint") {
            return this.confirmPurchaseDataList.filter(
                option =>
                    option.purchaseInvoice.toString().toLowerCase().includes(searchValue)
                    ||
                    option.vendorOBJ.vendorName.toString().toLowerCase().includes(searchValue)
            )
        } else if (reportChoise?.value === "receiptReprint") {
            return this.confirmSalesInvoiceDataList.filter(
                option =>
                    option.invoiceNumber.toString().toLowerCase().includes(searchValue)
                    ||
                    option.customerOBJ.custName.toString().toLowerCase().includes(searchValue)
            )

        }
        return [];

    }
    generateReport() {
        const invoiceNum = this.invoiceSelection.get('refNo');
        const selectedOpt = this.invoiceSelection.get('selectedOpt');
        const startDate = this.range.get('start');
        const endDate = this.range.get('end');


        if (invoiceNum != null && selectedOpt?.value == "voucherReprint") {
            this.getAllPurchasePaymentsForThePurchaseInvoice()
            
        }if(invoiceNum != null && selectedOpt?.value == "invoiceReprint"){
            this.getAllSalesPaymentsForTheSalesInvoice();
        } 
        else if (selectedOpt?.value == "purchaseReport" && (startDate != null && endDate != null)) {
            this.getConfirmedInvoiceByRange(startDate.value, endDate.value)
        }
       
    }


    getAllPurchasePaymentsForThePurchaseInvoice(){
        this.confirmPurchasePaymentService.getAllPurchaseInvoicePayments(this.invoiceId).subscribe((res)=>{
            console.log(res)
            if (res?.result) {
                this.dataToSet = {
                    reportType: "voucherReprint",
                    result: res.result,
                    error: null
                }
            } else if (res?.errors) {
                this.dataToSet = {
                    reportType: "voucherReprint",
                    error: res.errors,
                    result: null
                }
            }
            this.isReportGenerated = true
            this.cdr.detectChanges()
        },
        error => {
            console.error('Error fetching report:', error);
        })
    }
    getAllSalesPaymentsForTheSalesInvoice(){
        this.confirmSalesPurchasePaymentsService.getAllConfirmPaymentsOfConfirmInvoice(this.invoiceId).subscribe((res)=>{
            if (res?.result) {
                this.dataToSet = {
                    reportType: "invoiceReprint",
                    result: res.result,
                    error: null
                }
            } else if (res?.errors) {
                this.dataToSet = {
                    reportType: "invoiceReprint",
                    error: res.errors,
                    result: null
                }
            }
            this.isReportGenerated = true
            this.cdr.detectChanges()
        },
        error => {
            console.error('Error fetching report:', error);
        })
    }

    getConfirmedInvoiceByRange(start: any, end: any) {
        this.reportsService.selectPurchaseReportWithInRange(start, end).subscribe(
            (res) => {
                if (res?.result) {
                    this.dataToSet = {
                        reportType: "purchaseReport",
                        result: res.result,
                        error: null
                    }
                } else if (res?.errors) {
                    this.dataToSet = {
                        reportType: "purchaseReport",
                        error: res.errors,
                        result: null
                    }
                }


                this.isReportGenerated = true
                this.cdr.detectChanges();
            },
            error => {
                console.error('Error fetching report:', error);
            }
        );
    }

    // getAllConfirmInvoice() {
    //     this.isReportGenerated = true
    //     this.confirmedInvoiceService.getAllConfirmedInvoices().subscribe((invoiceData) => {
    //         this.dataToSet = invoiceData?.result
    //         // this.salesInvoiceDataList = invoiceData?.result 
    //         // console.log(invoiceData?.result)

    //     })
    //     // this.stockService.getAll().subscribe((res)=>{
    //     //     this.data = res
    //     //     this.isReportGenerated = true
    //     //     this.cdr.detectChanges();
    //     // })
    // }

    getTheSelectedInvoiceId(invoiceId: number) {
        this.invoiceId = invoiceId
    }


    printReport() {
        const stockTempDoc = document.getElementById("stockTemp");
        if (stockTempDoc) {
            html2canvas(stockTempDoc, { scale: 3 }).then(canvas => {

                const imgData = canvas.toDataURL('image/jpeg');

                const pdf = new jsPDF('p', 'mm', 'a4');

                const imgWidth = pdf.internal.pageSize.getWidth();
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

                const pdfWindow = window.open('', '_blank');
                if (pdfWindow) {
                    pdfWindow.document.open();
                    pdfWindow.document.write('<html><head><title>Report</title></head><body>');
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

}
