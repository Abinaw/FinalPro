import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { ConfirmInvoiceService } from 'src/app/service/confirmInvoice-service/confirm-invoice.service';
interface IListOfData {
    title: string,
    tableHeader: string[],
    tableData: string[][],
    error:any
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
            if(this.inputData?.result){
                this.setDataIntoTable(this.inputData)
            }else if(this.inputData.error != null){
                this.tableData={
                    title:"",
                    tableHeader:[],
                    tableData:[],
                    error: this.inputData?.error.map((errMessage: any) => {
                        return errMessage
                    })
                }
            }
        }
        
    }

    setDataIntoTable(inputData?: any){
        if(inputData.result && inputData?.reportType == "stockReport"){
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
                }),
                error:null

            }
        }else if(inputData.result && inputData?.reportType == "invoiceReprint"){
            this.tableData = {
                title: "invoice",
                tableHeader: [
                    
                ],
                tableData: this.inputData?.result.map((res: any) => {
                    
                   const confirmInvoiceOBJ = res.confirmInvoiceOBJ 
                   const stockOBJ=res.stockOBJ
                   const sellingPrice ="Rs " + (res.stockOBJ.sellingPrice).toFixed(2) 
                   const totalAmount = "Rs " + (res.netAmount).toFixed(2)
                    return [
                        stockOBJ.itemName,
                        res.quantity,
                        sellingPrice,
                        (((res.discount)/stockOBJ.sellingPrice)*100).toFixed(2)+"%",
                        totalAmount,
                    ]
                }),
                error:null
            }
        }else if(inputData.result && inputData?.reportType == "salesReport"){
            this.tableData = {
                title: "sales",
                tableHeader: [
                    // "Id",
                    "Customer",
                    "Invoice Number",
                    "Confirmed Date",
                    "Total Amount",
                    "Total Paid Amount",
                    "Advance Payment",
                   

                ],
                tableData: this.inputData?.result.map((res: any) => {
                    
                   const customerOBJ = res.customerOBJ 
                   const confirmedDate=moment(new Date(res.date)).toISOString();
                   const netAmount ="Rs " + (res.netAmount).toFixed(2) 
                   const paidAmount = "Rs " + (res.paidAmount).toFixed(2)
                   const advancePay = "Rs " + (res.advanceAmount).toFixed(2)
                    return [
                        // res.confirmInvoiceId,
                        customerOBJ.custName,
                        "#CLC-"+res.invoiceNumber,
                        confirmedDate.split("T")[0],
                        netAmount,
                        paidAmount,
                        advancePay,

                    ]
                }),error:null

            }
        }else if(inputData.result && inputData?.reportType == "purchaseReport"){
            this.tableData = {
                title: "purchase",
                tableHeader: [
                    // "Id",
                    "Vendor",
                    "Purchase Invoice Number",
                    "Purchase Date",
                    "Total Amount",
                    "Total Paid Amount",
                   

                ],
                tableData: this.inputData?.result.map((res: any) => {
                    
                   const vendorOBJ = res.vendorOBJ 
                   const purchaseDate=moment(new Date(res.purchaseDate)).toISOString();
                   const netAmount ="Rs " + (res.netAmount).toFixed(2) 
                   const paidAmount = "Rs " + (res.paidAmount).toFixed(2)
                //    const advancePay = "Rs " + (res.advanceAmount).toFixed(2)
                    return [
                        // res.confirmInvoiceId,
                        vendorOBJ.vendorName,
                        res.purchaseInvoice,
                        purchaseDate.split("T")[0],
                        netAmount,
                        paidAmount,
                       

                    ]
                }),error:null

            }
        }else if(inputData.result && inputData?.reportType == "purchasePayments"){
            this.tableData = {
                title: "purchase",
                tableHeader: [
                    // "paymentId",
                    "Purchase Invoice Number",
                    "Vendor",
                    "Time Stamp",
                    "Total Paid Amount",
                    "Payment Type",
                   

                ],
                tableData: this.inputData?.result.map((res: any) => {
                    
                   const vendorOBJ = res.vendorOBJ 
                   const purchaseDate=moment(new Date(res.paidDate)).toISOString();
                   const paidAmount = "Rs " + (res.paidAmount).toFixed(2)
                //    const advancePay = "Rs " + (res.advanceAmount).toFixed(2)
                    return [
                        // res.paymentId,
                        res.ConfirmPurchaseOBJ.purchaseInvoice,
                        vendorOBJ.vendorName,
                        purchaseDate.split("T")[0] +"|"+ purchaseDate.split("T")[1] ,
                        paidAmount,
                        res.paymentType
                       

                    ]
                }),error:null

            }
        }else if(inputData.result && inputData?.reportType == "salesPayments"){
            this.tableData = {
                title: "purchase",
                tableHeader: [
                    // "paymentId",
                    "Sales Invoice Number",
                    "Customer",
                    "Time Stamp",
                    "Total Paid Amount",
                    "Payment Type",
                   

                ],
                tableData: this.inputData?.result.map((res: any) => {
                    
                   const customerOBJ = res.confirmInvoiceOBJ.customerOBJ 
                   const paidDate=moment(new Date(res.paidDate)).toISOString();
                   const paidAmount = "Rs " + (res.paidAmount).toFixed(2)
                //    const advancePay = "Rs " + (res.advanceAmount).toFixed(2)
                    return [
                        // res.paymentId,
                        res.confirmInvoiceOBJ.invoiceNumber,
                        customerOBJ.custName,
                        paidDate.split("T")[0] +"|"+ paidDate.split("T")[1] ,
                        paidAmount,
                        res.paymentType
                       

                    ]
                }),error:null

            }
        }
    }
    getTotalNetAmount(): number {
        if (!this.inputData?.result) return 0;
        return this.inputData.result.reduce((total: number, item: any) => total + item.netAmount, 0);
    }
    isItemName(rowData: string[], aRowData: string): boolean {
        return rowData.indexOf(aRowData) === 0;
    }
    getDateForInvoiceRePrint(){
       return (moment(new Date(this.inputData?.result?.[0].confirmInvoiceOBJ?.date)).format("DD/MM/YYYY HH:mm:ss ")).split(" ")[0];
    }
    getTime(){
      const date =  moment(new Date(this.inputData?.result?.[0].confirmInvoiceOBJ?.date)).format("DD/MM/YYYY HH:mm:ss");
      return date.split(" ")[1]
    }
}
