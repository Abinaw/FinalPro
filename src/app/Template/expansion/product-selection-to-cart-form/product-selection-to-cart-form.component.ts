import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IStockEntity } from '../../interfaces/IStockEntity';
import { Observable, map, startWith } from 'rxjs';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { ProductCartService } from 'src/app/service/productCart-service/product-cart.service';


@Component({
  selector: 'app-product-selection-to-cart-form',
  templateUrl: './product-selection-to-cart-form.component.html',
  styleUrls: ['./product-selection-to-cart-form.component.css']
})



export class ProductSelectionToCartFormComponent  {
    cartValue!:any
    selectedProduct!:any
    productSelectionForm : FormGroup
    stockOBJControl = new FormControl('');
    stockDataList : IStockEntity[];
    filterOptions!: Observable<IStockEntity[]>
    selectedItemsQty! :number
    tempInvoiceOBJControl= new FormControl('');
    constructor(
        private toastr: ToastrService,
        private productCartService:ProductCartService,
        private matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
       
       this.stockDataList = GLOBAL_LIST.STOCK_DATA
        this.productSelectionForm=new FormGroup({
            proCartId:new FormControl,
            stockOBJ:new FormControl(Validators.required),
            quantity:new FormControl(null,[Validators.required,]),
            //#cmt  qty validation has been done below since the qty for selection will only be initialized once the stock has been selected 
            discount:new FormControl(Validators.required),
            netAmount:new FormControl(null),
            total:new FormControl(null),
            tempInvoiceOBJ:new FormControl()
        })
    }
 
    ngOnInit(): void {
        if (this.data.title === "Update") {
            this.setDataToInputForUpdation()
        }  
        this.filterOptions = this.stockOBJControl.valueChanges.pipe(
            startWith(''),
            map(value => this.listFilter(value || '')
            )
        )
       
        
    }

    private setDataToInputForUpdation(){
        this.productSelectionForm.patchValue({
            proCartId:this.data.selectedRowData.proCartId,
            discount:this.data.selectedRowData.discount,
            netAmount:this.data.selectedRowData.netAmount,
            quantity:this.data.selectedRowData.quantity,
            total:this.data.selectedRowData.total,
        })
        this.stockOBJControl.patchValue(this.data.selectedRowData.stockOBJ.stockId)
        this.tempInvoiceOBJControl.patchValue(this.data.selectedRowData.tempInvoiceOBJ.tempInvoiceId)
        this.getSelectedProduct_sList(this.data.selectedRowData.stockOBJ.stockId)   
    }
    quantityValidator(selectedItemsQty: number): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            const enteredQuantity = control.value;
            if (enteredQuantity && enteredQuantity > selectedItemsQty) {
                this.toastr.warning("Quantity should be either below or equals to "+selectedItemsQty)
                return { 'exceedsQty': true };
            }
            return null;
        };
    }

    selectOperation(){
        this.setvaluesToOBJFields()
        this.productCartService.regiterReq(this.productSelectionForm.value).subscribe(res=>{
            console.log("response ",res)
        })
    }



    private listFilter(value: string): IStockEntity[] {
        const searchValue = value.toString().toLowerCase();
        
        return this.stockDataList.filter(
            option => 
             option.itemName.toLowerCase().includes(searchValue) ||
             option.stockId.toString().toLowerCase().includes(searchValue)    
        )
    }

    private initializeQtyValidation(qty:number){
         //#cmt  only add this qty validation, once the qty has been acquired for the selected stock by the component 
         this.productSelectionForm.get('quantity')?.setValidators([
            Validators.required,
            this.quantityValidator(this.selectedItemsQty)
        ]);
        this.productSelectionForm.get('quantity')?.updateValueAndValidity();
        // end
    }

     getSelectedProduct_sList(prodId: number){
        this.selectedProduct =  this.stockDataList.filter(list=>list?.stockId === prodId);
        this.selectedItemsQty = this.selectedProduct?.[0]?.quantity
        // console.log(this.selectedItemsQty)
        this.initializeQtyValidation(this.selectedItemsQty)
               // return this.selectedProduct[0]  
    }
    setTotal(){
        this.cartValue = this.productSelectionForm.value;
        this.cartValue.total = this.selectedProduct[0].sellingPrice * this.cartValue.quantity 
        this.productSelectionForm.get('total')?.setValue(parseFloat(this.cartValue.total.toFixed(2)))
    }
    setNetAmount(){
        this.cartValue = this.productSelectionForm.value;
        let discount = this.cartValue.discount
        let totalDiscount = discount * this.cartValue.quantity
        this.cartValue.netAmount =  this.cartValue.total - totalDiscount;
        this.productSelectionForm.get('netAmount')?.setValue(parseFloat(this.cartValue.netAmount.toFixed(2)))
    }
    private setvaluesToOBJFields(){
       this.cartValue = this.productSelectionForm.value;
       this.cartValue.stockOBJ = {stockId:this.stockOBJControl.value}
       this.cartValue.tempInvoiceOBJ = {tempInvoiceId:this.data.selectedInvoiceId}  
       this.cartValue.stockOBJ.categoryOBJ={categoryId:this.selectedItemsQty = this.selectedProduct?.[0]?.categoryOBJ.categoryId}
       this.cartValue.tempInvoiceOBJ.customerOBJ={custId:this.data.customerId}
    }
    
   
}
