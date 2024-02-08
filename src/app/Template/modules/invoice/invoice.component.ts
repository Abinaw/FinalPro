import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { InvoiceActionComponent } from 'src/app/custom-components/action-cell/invoice-action/invoice-action.component';
import { InvoiceService } from 'src/app/service/invoice-service/invoice.service';
import { InvoiceFormComponent } from '../../createData-forms/invoice-form/invoice-form.component';
import { CustomerService } from 'src/app/service/customer-service/customer.service';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
    
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
            field: "netAmount",
            colId:"netAmount",
            headerName:"Net amount"
        
        },
        { 
            field: "customerOBJ",
            colId:"customerOBJ",
            headerName:"Customer",
            valueFormatter:(params)=>{
                return params.value.custName 
            }
            
        },
        {
            field:"action",
            headerName:"Action",
            cellRenderer: InvoiceActionComponent,}
    ];

    constructor(
        private dialog: MatDialog,
        private invoiceService: InvoiceService,
        private customerService : CustomerService,
    ) { this.getAllCustomerData() }

   


    onGridReady(param: GridReadyEvent) {
        this.rowData$ = this.getRowData();
        this.gridApi = param?.api
    }

    onCellClicked(cellClickedEvent: CellClickedEvent) {
       
    }

    private getRowData(): any {
        return new Promise((resolve) => {
            this.invoiceService.getAll().subscribe((invoiceData) => {
                resolve(invoiceData);
            }, (err) => {
                resolve([])
            })
        })
    }

  
    public setDataIntoRow() {       
        this.invoiceService.getAll().subscribe((invoiceData) => {
            this.gridApi.setRowData(invoiceData);
          }, (err) => {
          })
    }


    insertTrigger() {
        const extraData={
            title:"Insert"
        }
        const openForm = this.dialog.open(InvoiceFormComponent,{data:extraData})
        openForm.afterClosed().subscribe(res=>{
            this.setDataIntoRow();
        })
      
    }

    searchDataInRows()
    {
        // this.gridApi.setQuickFilter(this.searchCharac)
        if(this.searchCharac!==""){
        this.invoiceService.findData(this.searchCharac).subscribe(res=>{
          this.gridApi.setRowData(res) 
           });   
        }else if(this.searchCharac===""){
           this.setDataIntoRow()
        }
    }

    getAllCustomerData() {
        this.customerService.getAll().subscribe(res => {
            GLOBAL_LIST.CUSTOMER_DATA = res
        })
    }


    


}
