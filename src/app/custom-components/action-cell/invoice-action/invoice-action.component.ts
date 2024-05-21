import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, ICellRendererParams } from 'ag-grid';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from 'src/app/service/invoice-service/invoice.service';
import { ActionPopComponent } from '../action-pop/action-pop.component';
import { InvoiceFormComponent } from 'src/app/Template/createData-forms/invoice-form/invoice-form.component';
import { AgRendererComponent } from 'ag-grid-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-action',
  templateUrl: './invoice-action.component.html',
  styleUrls: ['./invoice-action.component.css']
})
export class InvoiceActionComponent  {

    params: any;
    dataFromRow: any;
    gridApi: GridApi | any = {};
    

    constructor(
        private router : Router,
        private toastr : ToastrService,
        public matDialog: MatDialog,
        private invoiceService:InvoiceService
       
    ) {

    }

    agInit(params: any): void {
        this.params = params;
        this.dataFromRow = params && params.data ? params.data : {};
        this.gridApi = params.api;
        
     }
     refresh(params: any): boolean {
        return false;
      }

     public setDataIntoRow() {
        this.invoiceService.getAll().subscribe((retData)=>{
            this.gridApi.setRowData(retData)
        })
    }
    openSelectedInvoice() {
        const dataString = JSON.stringify(this.params.data);
        this.router.navigate(['/dash-board/invoice/selectedInvoice'], { queryParams: { data: dataString } });
        
    }
    
    openDelDialog(): void {
        
        const extraData = {
            title : "Delete Invoice",
            subTitle: "Do you want to delete this invoice?",
        }
        const deletePop= this.matDialog.open(ActionPopComponent, {data: extraData, panelClass:"custom-dialog-container"});
        
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
            tempInvoiceData:this.dataFromRow,
            customerValue:this.dataFromRow.customerOBJ,
        }
            const dialogRef = this.matDialog.open(InvoiceFormComponent, {data, panelClass:"custom-dialog-container"});
            dialogRef.afterClosed().subscribe(()=>{
                this.setDataIntoRow()
            })
        }
}
