import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable, map, startWith } from 'rxjs';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { IConfirmInvoiceEntity } from 'src/app/constants/interfaces/IConfirmInvoiceEntity';
import { IDataToSet } from 'src/app/constants/interfaces/IDataToSetForReports';
import { ConfirmInvoiceService } from 'src/app/service/confirmInvoice-service/confirm-invoice.service';

@Component({
    selector: 'app-invoice-report',
    templateUrl: './invoice-report.component.html',
    styleUrls: ['./invoice-report.component.css']
})

export class InvoiceReportComponent {

    isReportGenerated!: boolean;
    selectedValue: string = '';
    filterOptions!: Observable<IConfirmInvoiceEntity[]>
    salesInvoiceDataList!: IConfirmInvoiceEntity[]
    invoiceNo! :number
    dataToSet: IDataToSet = { reportType: '', result: null };
    reports: any[] = [
        { value: 'invoiceReprint', viewValue: 'Invoice Re-print'},
        { value: 'salesReport', viewValue: 'Sales Report'},
    ];
    invoiceSelection: FormGroup;
    invoiceNoControl = new FormControl('');
    range: FormGroup;

    constructor(
        private confirmedInvoiceService: ConfirmInvoiceService,
        private cdr: ChangeDetectorRef
    ) {
        // this.dataToSet 
        this.salesInvoiceDataList = GLOBAL_LIST.CONFIRM_SALES_DATA

        this.invoiceSelection = new FormGroup({
            invoiceNo: new FormControl,
            selectedOpt: new FormControl,
        });

        this.range = new FormGroup({
            start: new FormControl({}, [Validators.required,]),
            end: new FormControl({}, [Validators.required,]),
        });

    }

    ngOnInit() {
        this.isReportGenerated = false
        this.filterOptions = this.invoiceNoControl.valueChanges.pipe(
            startWith(""),
            map((value) => this.listFilter(value || ""))
        );
    }


    private listFilter(value: string): IConfirmInvoiceEntity[] {

        const searchValue = value.toString().toLowerCase();
        return this.salesInvoiceDataList.filter(
            option =>
                option.confirmInvoiceId.toString().toLowerCase().includes(searchValue)
            ||
            option.customerOBJ.custName.toString().toLowerCase().includes(searchValue)
        )

    }
    generateReport() {
        this.getConfirmedInvoiceByInvoiceNo()
    }


    getConfirmedInvoiceByInvoiceNo(){
        console.log(this.invoiceNo)
        this.confirmedInvoiceService.getConfirmedInvoiceByInvoiceNumber(this.invoiceNo).subscribe((res) => {
           this.dataToSet = {
            reportType :"invoiceReprint",
            result: res?.result
           }
            this.isReportGenerated = true
            this.cdr.detectChanges();
        })
    }

    getAllConfirmInvoice() {
        this.isReportGenerated = true
        this.confirmedInvoiceService.getAllConfirmedInvoices().subscribe((invoiceData) => {
            this.dataToSet = invoiceData?.result
            // this.salesInvoiceDataList = invoiceData?.result 
            // console.log(invoiceData?.result)

        })
        // this.stockService.getAll().subscribe((res)=>{
        //     this.data = res
        //     this.isReportGenerated = true
        //     this.cdr.detectChanges();
        // })
    }

    getTheSelectedInvoice(invoiceNumber: number) {
        this.invoiceNo = invoiceNumber
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
