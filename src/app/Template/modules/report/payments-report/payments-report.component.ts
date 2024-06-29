import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { AgGridAngular } from "ag-grid-angular";
import {
    CellClickedEvent,
    ColDef,
    GridApi,
    GridReadyEvent,
} from "ag-grid-community";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
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
export class PaymentsReportComponent implements AfterViewInit{

    @ViewChild('voucherGrid') voucherGrid!: AgGridAngular;
    @ViewChild('receiptGrid') receiptGrid!: AgGridAngular;
    isReportGenerated!: boolean;
    selectedValue: string = '';
    filterOptions!: Observable<any[]>
    filterOptionPurchase!: Observable<any[]>
    public rowSelection: "single" | "multiple" = "single";
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
    purchaseInvoiceControl = new FormControl('');
    salesInvoiceNoControl = new FormControl('');
    range: FormGroup;
    
    purchaseInvoiceRowData$!: Observable<any[]>;
    voucherGridApi: GridApi | any = {};
    
    salesInvoiceRowData$!: Observable<any[]>;
    receiptGridApi: GridApi | any = {};

    constructor(
        private toastr: ToastrService,
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
        this.filterOptionPurchase = this.purchaseInvoiceControl.valueChanges.pipe(
            startWith(""),
            map((value) => this.listFilterPurchase(value || ""))
        );

        this.filterOptions = this.salesInvoiceNoControl.valueChanges.pipe(
            startWith(""),
            map((value) => this.listFilterSalesInvoice(value || ""))
        );
    }

    ngAfterViewInit() {
        // Here you can ensure that the ViewChild references are set
        console.log('voucherGrid:', this.voucherGrid);
        console.log('receiptGrid:', this.receiptGrid);
      }

    onCellClicked(cellClickedEvent: CellClickedEvent) { }


    private listFilterSalesInvoice(value: string): any[] {
        const searchValue = value.toString().toLowerCase();
        return this.confirmSalesInvoiceDataList.filter(
            option =>
                option.invoiceNumber.toString().toLowerCase().includes(searchValue)
                ||
                option.customerOBJ.custName.toString().toLowerCase().includes(searchValue)
        )

    }
    private listFilterPurchase(value: string): any[] {
        const searchValue = value.toString().toLowerCase();
        return this.confirmPurchaseDataList.filter(
            option =>
                option.purchaseInvoice.toString().toLowerCase().includes(searchValue)
                ||
                option.vendorOBJ.vendorName.toString().toLowerCase().includes(searchValue)
        )

    }

    // onOptionSelected(value: string, event: MatOptionSelectionChange) {
    //     if (event.isUserInput) {
    //       this.invoiceSelection.patchValue({ refNo: value });
    //     }
    //   }

   


    // generateReport() {
    //     const invoiceNum = this.invoiceSelection.get('refNo');
    //     const selectedOpt = this.invoiceSelection.get('selectedOpt');
    //     const startDate = this.range.get('start');
    //     const endDate = this.range.get('end');


    //     if (invoiceNum != null && selectedOpt?.value == "voucherReprint") {
    //         // this.getAllPurchasePaymentsForThePurchaseInvoice()

    //     } if (invoiceNum != null && selectedOpt?.value == "invoiceReprint") {
    //         // this.getAllSalesPaymentsForTheSalesInvoice();
    //     }
    //     else if (selectedOpt?.value == "purchaseReport" && (startDate != null && endDate != null)) {
    //         // this.getConfirmedInvoiceByRange(startDate.value, endDate.value)
    //     }
    // }


    // getAllPurchasePaymentsForThePurchaseInvoice() {
        // this.confirmPurchasePaymentService.getAllVoucherOfTheSelectedRefNo(this.invoiceId).subscribe((res) => {
        //     console.log(res)
    //         if (res?.result) {
    //             this.dataToSet = {
    //                 reportType: "voucherReprint",
    //                 result: res.result,
    //                 error: null
    //             }
    //         } else if (res?.errors) {
    //             this.dataToSet = {
    //                 reportType: "voucherReprint",
    //                 error: res.errors,
    //                 result: null
    //             }
    //         }
    //         this.isReportGenerated = true
    //         this.cdr.detectChanges()
    //     },
    //         error => {
    //             console.error('Error fetching report:', error);
    //         })
    // }
    // getAllSalesPaymentsForTheSalesInvoice() {
    //     this.confirmSalesPurchasePaymentsService.getAllReceiptsOfTheSelectedRefNo(this.invoiceId).subscribe((res) => {
    //         if (res?.result) {
    //             this.dataToSet = {
    //                 reportType: "invoiceReprint",
    //                 result: res.result,
    //                 error: null
    //             }
    //         } else if (res?.errors) {
    //             this.dataToSet = {
    //                 reportType: "invoiceReprint",
    //                 error: res.errors,
    //                 result: null
    //             }
    //         }
    //         this.isReportGenerated = true
    //         this.cdr.detectChanges()
    //     },
    //         error => {
    //             console.error('Error fetching report:', error);
    //         })
    // }

    /* getConfirmedInvoiceByRange(start: any, end: any) {
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
    } */


    getTheSelectedInvoiceId(invoice: number) {
        this.invoiceId = invoice
    }

    public voucherDef: ColDef[] = [

        {
            field: "voucherId",
            colId: "voucherId",
            headerName: "Voucher ID",

        },
        {
            field: "paidDate",
            colId: "paidDate",
            headerName: "Voucher Date",
            valueFormatter: (params) => {
                const val = (params.value)
                let dateTime = moment(new Date(val)).format("DD/MM/YYYY HH:mm:ss");
                dateTime = dateTime.split(' ')[0] + " | " + dateTime.split(' ')[1]
                return dateTime
            }
        },

        {
            field: "paidAmount",
            colId: "paidAmount",
            headerName: "Paid Amount",
            valueFormatter: (params) => {
                const val = "Rs. " + (params.value.toFixed(2))
                return val
            }
        },
        {
            field: "paymentType",
            colId: "paymentType",
            headerName: "Payment Type",

        },
        {
            field: "action",
            headerName: "Action",
            // cellRenderer: PurchaseCartActionComponent,
        },
    ];
    public receiptDef: ColDef[] = [

        {
            field: "receiptId",
            colId: "receiptId",
            headerName: "Receipt ID",


        },
        {
            field: "paidDate",
            colId: "paidDate",
            headerName: "Receipt Date",
            valueFormatter: (params) => {
                const val = (params.value)
                let dateTime = moment(new Date(val)).format("DD/MM/YYYY HH:mm:ss");
                dateTime = dateTime.split(' ')[0] + " | " + dateTime.split(' ')[1]
                return dateTime
            }
        },

        {
            field: "paidAmount",
            colId: "paidAmount",
            headerName: "Paid Amount",
            valueFormatter: (params) => {
                const val = "Rs. " + (params.value.toFixed(2))
                return val
            }
        },
        {
            field: "paymentType",
            colId: "paymentType",
            headerName: "Payment Type",

        },
        {
            field: "action",
            headerName: "Action",
            // cellRenderer: PurchaseCartActionComponent,
        },
    ];



    onGridVoucherDataReady(param: GridReadyEvent) {
        this.purchaseInvoiceRowData$ = this.getVoucherRowData();
        this.voucherGridApi = param?.api;
        console.log("on grid ready function",this.voucherGridApi)
    }
    onGridReceiptDataReady(param: GridReadyEvent) {

        this.salesInvoiceRowData$ = this.getReceiptRowData();
        this.receiptGridApi = param?.api;

    }


    private getVoucherRowData(): any {
        console.log("voucherId", this.invoiceId)
        return new Promise((resolve) => {
            resolve([]);
            // this.confirmPurchasePaymentService.getAllVoucherOfTheSelectedRefNo(this.invoiceId).subscribe((res) => {
            //     console.log("Row data :", res.result)
            //     resolve([]);

            // },
            //     (err) => {
            //         resolve([]);
            //     }
            // );
        });
    }
    private getReceiptRowData(): any {
        console.log("invoiceId", this.invoiceId)

        return new Promise((resolve) => {
            resolve([]);
            // this.confirmSalesPurchasePaymentsService.getAllReceiptsOfTheSelectedRefNo(this.invoiceId).subscribe((res) => {

            //     resolve([]);

            // },
            //     (err) => {
            //         resolve([]);
            //     }
            // );
        });
    }

    /*  public setDataIntoRow() {
         this.tempPurchaseCartService
             .getAllTempPurchaseCartItems(this.purchaseId)
             .subscribe(
                 (purchaseCartData?) => {
                     this.gridApi.setRowData(purchaseCartData?.result);
     
                 },
                 (err) => {
     
                 }
             );
     } */
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
    generateReport() {
        this.isReportGenerated = true;
        const selectedOpt = this.invoiceSelection.get('selectedOpt');
        const ref = this.invoiceSelection.get('refNo');
        if (selectedOpt?.value) {
            // if (ref?.value) {
                
                switch (selectedOpt.value) {
                    case 'voucherReprint':
                        console.log('Generating Voucher Re-print report for:', this.invoiceId);
                        this.confirmPurchasePaymentService.getAllVoucherOfTheSelectedRefNo(this.invoiceId).subscribe((res) => {
                            // this.isReportGenerated = true;
                            if (res?.result) {
                                this.voucherGridApi.setRowData(res.result)
                            } else {
                                this.voucherGridApi.setRowData([])
                            }
                            this.cdr.detectChanges();

                        })
                        break;
                    case 'receiptReprint':
                        console.log('Generating Voucher Re-print report for:', this.invoiceId);
                        // this.isReportGenerated = true;
                        this.confirmSalesPurchasePaymentsService.getAllReceiptsOfTheSelectedRefNo(this.invoiceId).subscribe((res) => {
                            if (res?.result) {
                                this.receiptGridApi.setRowData(res.result);  
                            } else {
                                this.receiptGridApi.setRowData([]);  
                            }
                            this.cdr.detectChanges();

                        })
                        break;
                    case 'allPaymentsReports':
                        console.log('Generating all Payments report', this.invoiceId);
                        break;
                    case 'customPaymentsReport':
                        console.log('Generating custom Reports for')
                        break;
                    default:
                        console.error('Invalid report type selected');

                }
            // }
            // else {
            //     this.toastr.clear()
            //     this.toastr.warning("Select a refNo!")
            // }

        } else {
            this.toastr.clear()
            this.toastr.warning("Select A Report Type To Generate any!")
        }

    }
    
}

