import { Component } from '@angular/core';
import { ActionPopComponent } from '../action-pop/action-pop.component';
import { StockService } from 'src/app/service/stock-service/stock.service';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, ICellRendererParams } from 'ag-grid';
import { StockFormComponent } from 'src/app/Template/createData-forms/stock-form/stock-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock-action',
  templateUrl: './stock-action.component.html',
  styleUrls: ['./stock-action.component.css']
})
export class StockActionComponent {

    dataFromRow: any;
    gridApi: GridApi | any = {};
    

    constructor(
        private toastr: ToastrService,
        public matDialog: MatDialog,
        private stockService:StockService
       
    ) {

    }

    agInit(params: ICellRendererParams): void {
        this.dataFromRow = params && params.data ? params.data : {};
        this.gridApi = params.api;
     }

     public setDataIntoRow() {
        this.stockService.getAll().subscribe((retData)=>{
            this.gridApi.setRowData(retData)
        })
    }

    openDelDialog(): void {
        
        const extraData = {
            title : "Delete",
            subTitle: "Do you want to delete this Stock?",
        }
        const deletePop= this.matDialog.open(ActionPopComponent, {data: extraData, panelClass:"custom-dialog-container"});
        
        deletePop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.stockService.delete(this.dataFromRow.stockId).subscribe((res)=>{
                this.toastr.success(res)
                this.setDataIntoRow();
            })
        })
       
    }
    
    updateFormTrigger() {
        
        const extraData={
            title: "Update",
            stockData:this.dataFromRow,
            categoryData: this.dataFromRow.categoryOBJ
        }
            const dialogRef = this.matDialog.open(StockFormComponent, {data:extraData, panelClass:"custom-dialog-container"});
            dialogRef.afterClosed().subscribe(()=>{
                this.setDataIntoRow()
            })
        }
       
}
