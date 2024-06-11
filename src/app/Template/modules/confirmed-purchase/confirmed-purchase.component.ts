import { Component, ViewChild } from '@angular/core';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPurchaseAndCartServiceService } from 'src/app/service/confirmPurchase-service/confirm-purchase-and-cart-service.service';
import { PaymentActionComponent } from 'src/app/custom-components/action-cell/payment-action/payment-action.component';
import { CustomerActionComponent } from 'src/app/custom-components/action-cell/customer-action/customer-action.component';

@Component({
  selector: 'app-confirmed-purchase',
  templateUrl: './confirmed-purchase.component.html',
  styleUrls: ['./confirmed-purchase.component.css']
})
export class ConfirmedPurchaseComponent {
    rowData$!: Observable<any[]>;
    @ViewChild(AgGridAngular)
    agGrid!: AgGridAngular
    gridApi: GridApi | any = {}
    public rowSelection: 'single' | 'multiple' = 'single';
    searchCharac : string=""


    public columnDef: ColDef[] = [
        // 
        { 
            field: "confirmPurchaseId",
            colId:"confirmPurchaseId",
            headerName:"Confirm Purchase id",
            width: 90, 
            hide: true
        },
        { 
            field: "purchaseDate",
            colId:"purchaseDate",
            headerName:"Date"
         },
         { 
            field: "purchaseInvoice",
            colId:"purchaseInvoice",
            headerName:"Purchase Invoice number"
         },
        { 
            field: "netAmount",
            colId:"netAmount",
            headerName:"Total amount"
        
        },
        { 
            field: "vendorOBJ",
            colId:"vendorOBJ",
            headerName:"Vendor",
            valueFormatter:(params)=>{
                const combinedvalue = params.value.vendorId+"-"+params.value.vendorName
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
            cellRenderer: PaymentActionComponent,
            cellRendererParams: {
                actionName: 'purchaseInvoice'
            } 
        }
    ];


    constructor(
        private dialog: MatDialog,
        private confirmPurchaseInvoiceService: ConfirmPurchaseAndCartServiceService
       
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
            this.confirmPurchaseInvoiceService.getAllConfirmPurchaseInvoices().subscribe((invoiceData) => {
                resolve(invoiceData?.result);
                // console.log(invoiceData)
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
        this.confirmPurchaseInvoiceService.getAllConfirmPurchaseInvoices().subscribe((invoiceData) => {
            // console.log(invoiceData?.result)
            this.gridApi.setRowData(invoiceData?.result);
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
    //     this.confirmPurchaseInvoiceService.findData(this.searchCharac).subscribe(res=>{
    //       this.gridApi.setRowData(res) 
    //        });   
    //     }else if(this.searchCharac===""){
    //        this.setDataIntoRow()
    //     }
    // }

    // getAllCustomerData() {
    //     this.customerService.getAll().subscribe(res => {
    //         GLOBAL_LIST.CUSTOMER_DATA = res
    //     })
    // }

}
