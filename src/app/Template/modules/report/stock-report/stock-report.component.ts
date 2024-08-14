import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IStockEntity } from 'src/app/constants/interfaces/IStockEntity';
import { StockService } from 'src/app/service/stock-service/stock.service';
import { ReportTemplateComponent } from '../report-template/report-template.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDataToSet } from 'src/app/constants/interfaces/IDataToSetForReports'
import { EmailService } from 'src/app/service/email-service/email.service';
import { ToastrService } from 'ngx-toastr';
import { EmailFormComponent } from 'src/app/Template/createData-forms/email-form/email-form.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-stock-report',
    templateUrl: './stock-report.component.html',
    styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent {
    selectedValue!: string;
    isReportGenerated!: boolean;
    stockList: IStockEntity[] = []
    dataToSet: IDataToSet = { reportType: '', result: null, error: null, dateRange: '' };
    reports: any[] = [
        { value: 'stock', viewValue: 'STOCK REPORT' },
    ];
    stockReport: FormGroup;


    constructor(
        private stockService: StockService,
        private cdr: ChangeDetectorRef,
        private toastr: ToastrService,
        private matDialog: MatDialog
    ) {
        this.stockReport = new FormGroup({
            stockOption: new FormControl,
        });
    }

    ngOnInit() {
        this.isReportGenerated = false
        this.stockReport.get('stockOption')?.setValue(this.reports[0].value);

    }
    generateReport() {
        this.getAllStock()
    }

    getAllStock() {
        this.stockService.getAllStock().subscribe((res) => {
            this.dataToSet = {
                dateRange: "",
                reportType: "Stock Report",
                result: res,
                error: null
            }
            this.isReportGenerated = true
            this.cdr.detectChanges();
        }, (error: HttpErrorResponse) => {
            console.error('Error fetching report:', error);

            let errorMessage = 'An unexpected error occurred. Please try again later.';

            if (error.status === 403) {
                errorMessage = 'You do not have permission to access this resource.';
            } else if (error.status === 404) {
                errorMessage = 'The requested resource was not found.';
            } else if (error.status === 500) {
                errorMessage = 'There was a server-side error. Please try again later.';
            }

            this.toastr.error(errorMessage, 'Error ' + error.status);
        }
        );
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

    openMailForm() {
        const stockTempDoc = document.getElementById("stockTemp");
        if (stockTempDoc) {
            const openForm = this.matDialog.open(EmailFormComponent, {
                data: { reportPic: stockTempDoc, reportType: this.stockReport.get('stockOption')?.value }, panelClass: ['custom-dialog-container'], backdropClass: "dialogbox-backdrop"
            });
        } else {
            this.toastr.error('Error occurred while generating the report');
        }
    }

}
