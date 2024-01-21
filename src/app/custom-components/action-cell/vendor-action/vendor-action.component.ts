import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, ICellRendererParams } from 'ag-grid';
import { VendorService } from 'src/app/service/vendor-service/vendor.service';
import { ActionPopComponent } from '../action-pop/action-pop.component';
import { VendorFormComponent } from 'src/app/Template/createData-forms/vendor-form/vendor-form.component';

@Component({
  selector: 'app-vendor-action',
  templateUrl: './vendor-action.component.html',
  styleUrls: ['./vendor-action.component.css']
})
export class VendorActionComponent {
    dataFromRow: any;
    gridApi: GridApi | any = {};
    

    constructor(
        public matDialog: MatDialog,
        private vendorService:VendorService
       
    ) {

    }

    agInit(params: ICellRendererParams): void {
        this.dataFromRow = params && params.data ? params.data : {};
        this.gridApi = params.api;
     }

     public setDataIntoRow() {
        this.vendorService.getAll().subscribe((retData)=>{
            this.gridApi.setRowData(retData)
        })
    }

    openDelDialog(): void {
        
        const extraData = {
            title : "Delete Vendor",
            subTitle: "Do you want to delete this Vendor?",
        }
        const deletePop= this.matDialog.open(ActionPopComponent, {data: extraData});
        
        deletePop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;

            
            this.vendorService.delete(this.dataFromRow.custId).subscribe((res)=>{
                console.log(res)
                this.setDataIntoRow();
            })
        })
       
    }
    
    updateFormTrigger() {
        const data={
            title: "Update",
            custData:this.dataFromRow
        }
            const dialogRef = this.matDialog.open(VendorFormComponent, {data});
            dialogRef.afterClosed().subscribe(()=>{
                this.setDataIntoRow()
            })
        }
}
