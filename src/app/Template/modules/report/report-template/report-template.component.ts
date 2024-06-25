import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { ConfirmInvoiceService } from 'src/app/service/confirmInvoice-service/confirm-invoice.service';
interface IListOfData {
    title: string,
    tableHeader: string[],
    tableData: string[][]
}
@Component({
    selector: 'app-report-template',
    templateUrl: './report-template.component.html',
    styleUrls: ['./report-template.component.css']
})
export class ReportTemplateComponent implements OnChanges {
    @Input('inputData') inputData!: any
    tableData!: IListOfData
    currentDate:any = new Date()
    constructor() {

    }
    ngOnChanges(changes: SimpleChanges): void {
        
        if (changes['inputData']) {
            console.log("after detect change ",this.inputData)
            this.setDataIntoTable(this.inputData)
        }
        
    }

    setDataIntoTable(inputData: any){
        if(inputData.reportType == "stockReport"){
            this.tableData = {
                title: "stock",
                tableHeader: [
                    // 'stockId',
                    'Item Name',
                    'MaterialColour',
                    'ArrivalDate',
                    'purhcasePrice',
                    'SellingPrice',
                    // 'reorder Qty',
                    'Quantity',
                    'Remarks',
                ],
                tableData: this.inputData?.result.map((res: any) => {
                   const arrivalDate = moment(new Date(res.arrivalDate)).toISOString();
                   const purchasePrice ="Rs " + (res.purchasePrice).toFixed(2)
                   const sellingPrice = "Rs "+(res.sellingPrice).toFixed(2)
                    return [
                        // res.stockId,
                        res.itemName,
                        res.materialColour,
                        arrivalDate.split("T")[0],
                        purchasePrice,
                        sellingPrice,
                        // res.reorderQty,
                        res.quantity,
                        "'"+res.remarks+"'",
                    ]
                })

            }
            debugger
        }else if(inputData.reportType == "invoiceReprint"){
            const res = this.inputData?.result;
            const completedDate = moment(new Date(res.date)).toISOString();
            const paidAmount = "Rs " + (res.paidAmount).toFixed(2);
            const gross = "Rs " + (res.netAmount).toFixed(2);
            this.tableData = {
                title: "invoice",
                tableHeader: [
                    'Customer',
                    'Paid Amount',
                    'Gross Amount',
                    'Confirmed Date',
                    
                ],
                tableData: [[
                    res.customerOBJ.custName,
                    paidAmount,
                    gross,
                    completedDate.split("T")[0], 
                ]]
            };
        }
    }


}
