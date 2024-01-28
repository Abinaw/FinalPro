import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { StockActionComponent } from 'src/app/custom-components/action-cell/stock-action/stock-action.component';
import { StockService } from 'src/app/service/stock-service/stock.service';
import { StockFormComponent } from '../../createData-forms/stock-form/stock-form.component';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
styleUrls: ['./stock.component.css','../../../../assets/CSS/ComponentCommDesign.css']
})
export class StockComponent {
    rowData$!: Observable<any[]>;
    @ViewChild(AgGridAngular)
    agGrid!: AgGridAngular
    gridApi: GridApi | any = {}
    public rowSelection: 'single' | 'multiple' = 'single';
    searchCharac : string=""
    public columnDef: ColDef[] = [
        // 
        { field: "stockId", width: 90, hide: true, suppressColumnsToolPanel: true },
        { field: "materialName", },
        { field: "materialType", },
        { field: "materialColour", },
        { field: "arrivalDate", },
        { field: "purchasePrice",},
        { field: "sellingPrice",},
        { field: "reorderQty",width:100},
        { field: "quantity",width:90 },
        { field: "remarks",},
        { field: "Action",width: 90, cellRenderer: StockActionComponent, }
    ];

    constructor(
        private dialog: MatDialog,
        private stockService: StockService,
    ) { }

   


    onGridReady(param: GridReadyEvent) {
        this.rowData$ = this.getRowData();
        this.gridApi = param?.api
    }

    onCellClicked(cellClickedEvent: CellClickedEvent) {
        //    console.log(cellClickedEvent)
    }

    private getRowData(): any {
        return new Promise((resolve) => {
            this.stockService.getAllUser().subscribe((stockData) => {
                resolve(stockData);
            }, (err) => {
                resolve([])
            })
        })
    }

    // every Time delete,add,update have been used this specific function should be used by classes(popups or etc) so kept public 
    // or else this should be created for every class 
    public setDataIntoRow() {       
        this.stockService.getAllUser().subscribe((stockData) => {
            this.gridApi.setRowData(stockData);
          }, (err) => {
          })
    }


    insertTrigger() {
        const extraData={
            title:"Insert"
        }
        const openForm = this.dialog.open(StockFormComponent,{data:extraData})
        openForm.afterClosed().subscribe(res=>{
            this.setDataIntoRow();
        })
      
    }

    searchDataInRows()
    {
        // this.gridApi.setQuickFilter(this.searchCharac)
        if(this.searchCharac!==""){
        this.stockService.findData(this.searchCharac).subscribe(res=>{
          this.gridApi.setRowData(res) 
           });   
        }else if(this.searchCharac===""){
           this.setDataIntoRow()
        }
    }

}
