import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable, map, startWith } from 'rxjs';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { IConfirmInvoiceEntity } from 'src/app/constants/interfaces/IConfirmInvoiceEntity';
import { IDataToSet } from 'src/app/constants/interfaces/IDataToSetForReports';
import { ConfirmInvoiceService } from 'src/app/service/confirmInvoice-service/confirm-invoice.service';
import { ReportsServiceService } from 'src/app/service/reports-service/reports-service.service';

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
    dataToSet: IDataToSet = { reportType: '', result: null,error:null };
    reports: any[] = [
        { value: 'invoiceReprint', viewValue: 'Invoice Re-print'},
        { value: 'salesReport', viewValue: 'Sales Report'},
    ];
    invoiceSelection: FormGroup;
    invoiceNoControl = new FormControl('');
    range: FormGroup;

    constructor(
        private confirmedInvoiceService: ConfirmInvoiceService,
        private cdr: ChangeDetectorRef,
        private reportsService:ReportsServiceService
    ) {
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
        const invoiceNum = this.invoiceSelection.get('invoiceNo');
        const selectedOpt = this.invoiceSelection.get('selectedOpt');
        const startDate = this.range.get('start');
        const endDate = this.range.get('end');

       
        if(invoiceNum!=null && selectedOpt?.value=="invoiceReprint"){   
            this.getConfirmedInvoiceByInvoiceNo()
           
        }else if(selectedOpt?.value=="salesReport" &&(startDate!=null && endDate !=null)){
            this.getConfirmedInvoiceByRange(startDate.value,endDate.value)
        }
       
    }


    getConfirmedInvoiceByInvoiceNo(){
        this.confirmedInvoiceService.getAllConfirmedProCartItemsByInvoiceId(this.invoiceNo).subscribe((res) => {
            
            if(res?.result){
                this.dataToSet = {
                    reportType :"invoiceReprint",
                    result: res?.result,
                    error:null
               }
              
            }else if(res?.errors){
                this.dataToSet = {
                    reportType :"invoiceReprint",
                    result: null,
                    error:res.errors
               }
            }
            this.isReportGenerated = true
            this.cdr.detectChanges();
        }, error => {
            console.error('Error fetching report:', error);
        })
    }

    getConfirmedInvoiceByRange(start: any, end: any){
        this.reportsService.selectSalesReportWithInRange(start, end).subscribe(
            (res) => {
                if(res?.result){
                    this.dataToSet = {
                        reportType :"salesReport",
                        result: res?.result,
                        error:null
                   }
                  
                }else if(res?.errors){
                    this.dataToSet = {
                        reportType :"salesReport",
                        result: null,
                        error:res.errors
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
