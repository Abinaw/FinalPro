import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { map, Observable, startWith } from 'rxjs';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { ICustomerEntity } from 'src/app/constants/interfaces/CustomerEntity';
import { IDataToSet } from 'src/app/constants/interfaces/IDataToSetForReports';
import { ReportsServiceService } from 'src/app/service/reports-service/reports-service.service';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})
export class CustomerReportComponent {
customerReportForm: FormGroup; 
filterOptions!: Observable<ICustomerEntity[]>;
isReportGenerated!: boolean;
invoiceNo! :number
dataToSet: IDataToSet = { reportType: '', result: null,error:null };
range: FormGroup;
customerDataList!: ICustomerEntity[]
reports: any[] = [
    { value: 'customerReport', viewValue: 'Customer Report With in Range'},
 
];
customerControl = new FormControl('');
constructor(
    // private confirmedInvoiceService: ConfirmInvoiceService,
    private cdr: ChangeDetectorRef,
    private reportsService:ReportsServiceService
) {
    this.customerDataList = GLOBAL_LIST.CUSTOMER_DATA

    this.customerReportForm = new FormGroup({
        selectedOpt: new FormControl,
        customer: new FormControl,
    });

    this.range = new FormGroup({
        start: new FormControl({}, [Validators.required,]),
        end: new FormControl({}, [Validators.required,]),
    });

}
ngOnInit() {
    this.isReportGenerated = false
    this.customerReportForm.get('selectedOpt')?.setValue(this.reports[0].value);
    this.filterOptions = this.customerControl.valueChanges.pipe(
        startWith(""),
        map((value) => this.listFilter(value || ""))
    );
}

private listFilter(value: string): ICustomerEntity[] {

    const searchValue = value.toString().toLowerCase();
    return this.customerDataList.filter(
        option =>
            option.custId.toString().toLowerCase().includes(searchValue)
        ||
        option.custName.toString().toLowerCase().includes(searchValue)
    )

}

generateReport() {
    // const invoiceNum = this.invoiceSelection.get('invoiceNo');
    // const selectedOpt = this.invoiceSelection.get('selectedOpt');
    // const startDate = this.range.get('start');
    // const endDate = this.range.get('end');

   
    // if(invoiceNum!=null && selectedOpt?.value=="invoiceReprint"){   
    //     this.getConfirmedInvoiceByInvoiceNo()
       
    // }else if(selectedOpt?.value=="salesReport" &&(startDate!=null && endDate !=null)){
    //     this.getConfirmedInvoiceByRange(startDate.value,endDate.value)
    // }
   
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
