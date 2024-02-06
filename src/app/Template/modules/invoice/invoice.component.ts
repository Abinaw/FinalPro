import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { InvoiceActionComponent } from 'src/app/custom-components/action-cell/invoice-action/invoice-action.component';
import { InvoiceService } from 'src/app/service/invoice-service/invoice.service';
import { InvoiceFormComponent } from '../../createData-forms/invoice-form/invoice-form.component';

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
        { field: "tempInvoiceId", width: 90, hide: true},
        { field: "date", },
        { field: "netAmount", },
        { 
            field: "customerOBJ",
            valueFormatter:(params)=>{
                return params.value.custName 
            }
            
        },
        {field:"action",cellRenderer: InvoiceActionComponent,}
    ];

    constructor(
        private dialog: MatDialog,
        private invoiceService: InvoiceService,
    ) { }

   


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


    


}
