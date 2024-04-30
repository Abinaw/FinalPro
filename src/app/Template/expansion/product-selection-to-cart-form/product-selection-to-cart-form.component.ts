import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IStockEntity } from '../../interfaces/IStockEntity';
import { Observable, map, startWith } from 'rxjs';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { ProductCartService } from 'src/app/service/productCart-service/product-cart.service';
import { StockService } from 'src/app/service/stock-service/stock.service';
import { ActionPopComponent } from 'src/app/custom-components/action-cell/action-pop/action-pop.component';


@Component({
  selector: 'app-product-selection-to-cart-form',
  templateUrl: './product-selection-to-cart-form.component.html',
  styleUrls: ['./product-selection-to-cart-form.component.css']
})



export class ProductSelectionToCartFormComponent  {
    
    selectedProduct!:any
    productSelectionForm : FormGroup
    stockOBJControl = new FormControl('');
    stockDataList : IStockEntity[];
    filterOptions!: Observable<IStockEntity[]>
    selectedItemsQty! :number
    tempInvoiceOBJControl= new FormControl('');

   
    constructor(
        private matDialogRef:MatDialogRef<ProductSelectionToCartFormComponent>,
        private stockService :StockService,
        private toastr: ToastrService,
        private productCartService:ProductCartService,
        private matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        
       this.stockDataList = GLOBAL_LIST.STOCK_DATA
       console.log("On the constructor ", this.stockDataList)
        this.productSelectionForm=new FormGroup({
            proCartId:new FormControl,
            stockOBJ:new FormControl(Validators.required),
            quantity:new FormControl([Validators.required,]),
            //#cmt  qty validation has been done below, since the qty for selection will only be filtered from the list once the stock has been selected 
            discount:new FormControl(Validators.required),
            netAmount:new FormControl(null),
            total:new FormControl(null),
            tempInvoiceOBJ:new FormControl()
        })
    }
 
    ngOnInit(): void {
      
        if (this.data.title === "Update") {
            this.setDataToInputForUpdation()
            console.log("when update" ,this.stockDataList)
        }  
        this.filterOptions = this.stockOBJControl.valueChanges.pipe(
            startWith(''),
            map(value => this.listFilter(value || '')
            )
        )
       
        
    }

    private setDataToInputForUpdation(){
        let stockIdOfTheSelectedRow = this.data.selectedRowData.stockOBJ.stockId
        this.productSelectionForm.patchValue({
            proCartId:this.data.selectedRowData.proCartId,
            discount:this.data.selectedRowData.discount,
            netAmount:this.data.selectedRowData.netAmount,
            quantity:this.data.selectedRowData.quantity,
            total:this.data.selectedRowData.total,
        })
        this.stockOBJControl.patchValue(this.data.selectedRowData.stockOBJ.stockId)
        this.tempInvoiceOBJControl.patchValue(this.data.selectedRowData.tempInvoiceOBJ.tempInvoiceId)
        this.getSelectedProduct_sList(stockIdOfTheSelectedRow)   
    }

    quantityValidator(selectedItemsQty: number): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            const enteredQuantity = control.value;
            // if(this.data.title==="Add")
                
            if (this.data.title==="Add" && enteredQuantity && enteredQuantity > selectedItemsQty) {
                this.toastr.warning("Quantity should be either below or equals to "+selectedItemsQty)
                return { 'exceedsQty': true };  
            }    
            //  }else if(this.data.title==="Update" && enteredQuantity > (selectedItemsQty-enteredQuantity)){
            //     this.toastr.warning("Quantity should be either below or equals to "+selectedItemsQty)
            //     return { 'exceedsQty': true };   
            //  }
            return null;
        };
    }

    selectOperation(){
        this.setvaluesToOBJFields()
        if(this.data.title ==="Add"){
            this.productCartService.regiterReq(this.productSelectionForm.value).subscribe(res=>{
                console.log("response ",res)
            })
        }else if(this.data.title === "Update"){
            this.updatePopTrigger();            
        }
       
    }


    getAllStockData() {
        this.stockService.getAll().subscribe(res => {
            GLOBAL_LIST.STOCK_DATA = res
        })
    }

    updatePopTrigger() {
        this.setInvoiceDetailsForUpdation()
        const extraData = {
            title: this.data.title,
            subTitle: "are you sure you want to update the selected data?",
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData })
        openActionPop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.productCartService.update(this.productSelectionForm.value).subscribe((res)=>{             
                this.matDialogRef.close()
                this.toastr.success(res)
            })
            this.getAllStockData()
        })

    }


    private listFilter(value: string): IStockEntity[] {
        if(value){
            const searchValue = value.toString().toLowerCase();
            return this.stockDataList.filter(
                option => 
                 option.itemName.toLowerCase().includes(searchValue) ||
                 option.stockId.toString().toLowerCase().includes(searchValue)    
            )
        }else{
           return this.stockDataList = GLOBAL_LIST.STOCK_DATA
        }
      
    }

     initializeQtyValidation(qty:number){
         //#cmt  only add this qty validation, once the qty has been acquired for the selected stock by the component 
         this.productSelectionForm.get('quantity')?.setValidators([
            Validators.required,
            this.quantityValidator(this.selectedItemsQty)
        ]);
        this.productSelectionForm.get('quantity')?.updateValueAndValidity();
        // end
    }

     getSelectedProduct_sList(stockId: number){
        // console.log(stockId)
        this.selectedProduct =  this.stockDataList.filter(list=>list?.stockId === stockId);
        this.selectedItemsQty = this.selectedProduct?.[0]?.quantity
        this.initializeQtyValidation(this.selectedItemsQty)
    }
    setTotal(){
        let cartValue = this.productSelectionForm.value;
        cartValue.total = this.selectedProduct?.[0]?.sellingPrice * cartValue.quantity 
        this.productSelectionForm.get('total')?.setValue(parseFloat(cartValue.total.toFixed(2)))
    }
    setNetAmount(){
        let cartValue = this.productSelectionForm.value;
        let discount = cartValue.discount
        let totalDiscount = discount * cartValue.quantity
        cartValue.netAmount =  cartValue.total - totalDiscount;
        this.productSelectionForm.get('netAmount')?.setValue(parseFloat(cartValue.netAmount.toFixed(2)))
    }
    private setvaluesToOBJFields(){
       let cartValue = this.productSelectionForm.value;
       cartValue.stockOBJ = {stockId:this.stockOBJControl.value}
       cartValue.stockOBJ.categoryOBJ={categoryId:this.selectedItemsQty = this.selectedProduct?.[0]?.categoryOBJ.categoryId}
       cartValue.tempInvoiceOBJ = {tempInvoiceId:this.data.selectedInvoiceId}  
       cartValue.tempInvoiceOBJ.customerOBJ={custId:this.data.customerId}
    }
    private setInvoiceDetailsForUpdation(){
        let cartValue = this.productSelectionForm.value;
        cartValue.tempInvoiceOBJ = this.data.selectedRowData.tempInvoiceOBJ
    }
    

    
   
}
