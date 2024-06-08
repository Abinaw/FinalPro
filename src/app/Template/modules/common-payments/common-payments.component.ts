import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-common-payments',
  templateUrl: './common-payments.component.html',
  styleUrls: ['./common-payments.component.css']
})
export class CommonPaymentsComponent {

    rowData$!: Observable<any[]>;
    @ViewChild(AgGridAngular)
    agGrid!: AgGridAngular
    gridApi: GridApi | any = {}
    public rowSelection: 'single' | 'multiple' = 'single';
    searchCharac : string=""
    public columnDef: ColDef[] = [
        // 
        { 
            field: "tempInvoiceId",
            colId:"tempInvoiceId",
            headerName:"Temp id",
            width: 90, 
            hide: true
        },
        { 
            field: "date",
            colId:"date",
            headerName:"Date"
         },
         { 
            field: "tempInvoiceNumber",
            colId:"tempInvoiceNumber",
            headerName:"Invoice number"
         },
        { 
            field: "netAmount",
            colId:"netAmount",
            headerName:"Net amount"
        
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
        // { 
        //     field: "finalized",
        //     colId:"finalized",
        //     headerName:"Is Finalized",
        //     cellRenderer: InvoiceFinalizationComponent, 
        //     hide: true
        // },    
        // {
        //     field:"action",
        //     headerName:"Action",
        //     cellRenderer: InvoiceActionComponent,
             
        // }
    ];

  


    constructor(
        private dialog: MatDialog,
       
       
    ) { 
      
        
    }

    


    // onGridReady(param: GridReadyEvent) {
    //     this.rowData$ = this.getRowData();
    //     this.gridApi = param?.api
    // }
    

    // onCellClicked(cellClickedEvent: CellClickedEvent) {
       
    // }

    // private getRowData(): any {
    //     return new Promise((resolve) => {
    //         this.invoiceService.getAll().subscribe((invoiceData) => {
    //             resolve(invoiceData);
    //         }, (err) => {
    //             resolve([])
    //         })
    //     })
    // }

    // // loadAllProductCart(){
    // //     this.productCartService.loadAll().subscribe((cartData)=>{
    // //        GLOBAL_LIST.PRODUCTCART_DATA =  cartData?.result?.[0]
    // //     })
    // // }
    // public setDataIntoRow() {       
    //     this.invoiceService.getAll().subscribe((invoiceData) => {
    //         this.gridApi.setRowData(invoiceData);
    //       }, (err) => {
    //       })
    // }


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

    // getAllCustomerData() {
    //     this.customerService.getAll().subscribe(res => {
    //         GLOBAL_LIST.CUSTOMER_DATA = res
    //     })
    // }

}