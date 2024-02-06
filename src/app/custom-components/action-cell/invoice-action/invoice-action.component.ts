import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, ICellRendererParams } from 'ag-grid';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from 'src/app/service/invoice-service/invoice.service';
import { ActionPopComponent } from '../action-pop/action-pop.component';
import { InvoiceFormComponent } from 'src/app/Template/createData-forms/invoice-form/invoice-form.component';

@Component({
  selector: 'app-invoice-action',
  templateUrl: './invoice-action.component.html',
  styleUrls: ['./invoice-action.component.css']
})
export class InvoiceActionComponent {
    dataFromRow: any;
    gridApi: GridApi | any = {};
    

    constructor(
        private toastr : ToastrService,
        public matDialog: MatDialog,
        private invoiceService:InvoiceService
       
    ) {

    }

    agInit(params: ICellRendererParams): void {
        this.dataFromRow = params && params.data ? params.data : {};
        this.gridApi = params.api;
     }

     public setDataIntoRow() {
        this.invoiceService.getAll().subscribe((retData)=>{
            this.gridApi.setRowData(retData)
        })
    }

    openDelDialog(): void {
        
        const extraData = {
            title : "Delete Invoice",
            subTitle: "Do you want to delete this invoice?",
        }
        const deletePop= this.matDialog.open(ActionPopComponent, {data: extraData});
        
        deletePop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;

            
            this.invoiceService.delete(this.dataFromRow.tempInvoiceId).subscribe((res)=>{
                this.toastr.success(res)
                this.setDataIntoRow();
            })
        })
       
    }
    
    updateFormTrigger() {
        const data={
            title: "Update",
            tempInvoiceData:this.dataFromRow
        }
            const dialogRef = this.matDialog.open(InvoiceFormComponent, {data});
            dialogRef.afterClosed().subscribe(()=>{
                this.setDataIntoRow()
            })
        }
}
