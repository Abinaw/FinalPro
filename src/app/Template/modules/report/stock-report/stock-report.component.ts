import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IStockEntity } from 'src/app/constants/interfaces/IStockEntity';
import { StockService } from 'src/app/service/stock-service/stock.service';
import { ReportTemplateComponent } from '../report-template/report-template.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDataToSet } from 'src/app/constants/interfaces/IDataToSetForReports';

@Component({
    selector: 'app-stock-report',
    templateUrl: './stock-report.component.html',
    styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent {
    selectedValue!: string;
    isReportGenerated!: boolean;
    stockList: IStockEntity[] = []
    dataToSet: IDataToSet = { reportType: '', result: null };
    reports: any[] = [
        { value: 'stock', viewValue: 'STOCK REPORT' },
        { value: 'etc', viewValue: '...' },
    ];
    stockReport:FormGroup;


    constructor(
        private stockService: StockService,
        private cdr: ChangeDetectorRef
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
        this.stockService.getAll().subscribe((res) => {
            this.dataToSet.result = res
            this.dataToSet.reportType = "stockReport"
            this.isReportGenerated = true
            this.cdr.detectChanges();
        })
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
