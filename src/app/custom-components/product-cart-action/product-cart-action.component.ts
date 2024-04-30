import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, ICellRendererParams } from 'ag-grid';
import { ToastrService } from 'ngx-toastr';
import { ProductCartService } from 'src/app/service/productCart-service/product-cart.service';
import { ActionPopComponent } from '../action-cell/action-pop/action-pop.component';
import { ProductSelectionToCartFormComponent } from 'src/app/Template/expansion/product-selection-to-cart-form/product-selection-to-cart-form.component';

@Component({
  selector: 'app-product-cart-action',
  templateUrl: './product-cart-action.component.html',
  styleUrls: ['./product-cart-action.component.css']
})
export class ProductCartActionComponent {
    dataFromRow: any;
    gridApi: GridApi | any = {};
    

    constructor(
        private toastr : ToastrService,
        public matDialog: MatDialog,
        private productCartService:ProductCartService
       
    ) {

    }

    agInit(params: ICellRendererParams): void {
        this.dataFromRow = params && params.data ? params.data : {};
        this.gridApi = params.api;
     }

     public setDataIntoRow() {
        let invoiceId = this.dataFromRow.tempInvoiceOBJ.tempInvoiceId
        this.productCartService.getAll(invoiceId).subscribe((cartData)=>{
            this.gridApi.setRowData(cartData.result[0])
        })
    }

    openDelDialog(): void {
     
        const extraData = {
            title : "Delete Product",
            subTitle: "Do you want to delete this Product from the invoice?",
        }
        const deletePop= this.matDialog.open(ActionPopComponent, {data: extraData});
        
        deletePop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
          
            this.productCartService.delete(this.dataFromRow.proCartId).subscribe((res)=>{
                this.toastr.success(res.successMessage)
                this.setDataIntoRow();
            })
        })
       
    }
    
    updateFormTrigger() {
        const data={
            title: "Update",
            selectedRowData:this.dataFromRow
            
        }
            const dialogRef = this.matDialog.open(ProductSelectionToCartFormComponent, {data});
            dialogRef.afterClosed().subscribe(()=>{
                this.setDataIntoRow()
            })
        }
}
