import { Component, ViewChild } from '@angular/core';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmInvoiceService } from 'src/app/service/confirmInvoice-service/confirm-invoice.service';
import { PaymentActionComponent } from 'src/app/custom-components/action-cell/payment-action/payment-action.component';
import { InvoiceActionComponent } from 'src/app/custom-components/action-cell/invoice-action/invoice-action.component';


@Component({
  selector: 'app-confirmed-sales-invoice',
  templateUrl: './confirmed-sales-invoice.component.html',
  styleUrls: ['./confirmed-sales-invoice.component.css']
})
export class ConfirmedSalesInvoiceComponent {
    rowData$!: Observable<any[]>;
    @ViewChild(AgGridAngular)
    agGrid!: AgGridAngular
    gridApi: GridApi | any = {}
    public rowSelection: 'single' | 'multiple' = 'single';
    searchCharac : string=""


    
    

    public columnDef: ColDef[] = [
        // 
        { 
            field: "confirmInvoiceId",
            colId:"confirmInvoiceId",
            headerName:"Confirm Sales Invoice id",
            width: 90, 
            hide: true
        },
        { 
            field: "date",
            colId:"date",
            headerName:"Date"
         },
         { 
            field: "invoiceNumber",
            colId:"invoiceNumber",
            headerName:"Sales Invoice number"
         },
        { 
            field: "netAmount",
            colId:"netAmount",
            headerName:"Total amount"
        
        },
        { 
            field: "customerOBJ",
            colId:"customerOBJ",
            headerName:"Customer",
            valueFormatter:(params)=>{
                const combinedvalue = params.value.custId+"-"+params.value.custName
                return combinedvalue
            }
            
        },
        { 
            field: "paidAmount",
            colId:"paidAmount",
            headerName:"Paid amount"
        
        },
        { 
            field: "isComplete",
            colId:"isComplete",
            headerName:"Is Complete",
            hide: true
        },    
        {
            field:"action",
            headerName:"Action",
            // cellRenderer:,
            cellRenderer :PaymentActionComponent,
            cellRendererParams: {
                actionName: 'salesInvoice'
            }
             
        }
    ];



    constructor(
        private dialog: MatDialog,
        private confirmInvoiceService:ConfirmInvoiceService
       
    ) { 
       
    }

    onGridReady(param: GridReadyEvent) {
        this.rowData$ = this.getRowData();
        this.gridApi = param?.api
    }
    

    onCellClicked(cellClickedEvent: CellClickedEvent) {
     
    }
    
    private getRowData(): any {
        return new Promise((resolve) => {
            this.confirmInvoiceService.getAllConfirmedInvoices().subscribe((invoiceData) => {
                // console.log(invoiceData)
                resolve(invoiceData?.result);
            }, (err) => {
                resolve([])
            })
        })
    }

    // loadAllProductCart(){
    //     this.productCartService.loadAll().subscribe((cartData)=>{
    //        GLOBAL_LIST.PRODUCTCART_DATA =  cartData?.result?.[0]
    //     })
    // }
    public setDataIntoRow() {       
        this.confirmInvoiceService.getAllConfirmedInvoices().subscribe((invoiceData) => {
            this.gridApi.setRowData(invoiceData?.result);
            // console.log(invoiceData)
          }, (err) => {
          })
    }


    // insertTrigger() {
        
       
    //     const extraData={
    //         title:"Insert"
    //     }
    //     const openForm = this.dialog.open(InvoiceFormComponent,{data:extraData , panelClass:"custom-dialog-container"})
    //     openForm.afterClosed().subscribe(res=>{
    //         this.setDataIntoRow();
    //     })
      
    // }

    // searchDataInRows()
    // {
    //     // this.gridApi.setQuickFilter(this.searchCharac)
    //     if(this.searchCharac!==""){
    //     this.invoiceService.findData(this.searchCharac).subscribe(res=>{
    //       this.gridApi.setRowData(res) 
    //        });   
    //     }else if(this.searchCharac===""){
    //        this.setDataIntoRow()
    //     }
    // }

   

}
