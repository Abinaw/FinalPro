import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IStockEntity } from '../../../constants/interfaces/IStockEntity';
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



export class    ProductSelectionToCartFormComponent  {
   
    selectedProduct!:any
    productSelectionForm : FormGroup
    stockOBJControl = new FormControl('')
    stockDataList : IStockEntity[];
    filterOptions!: Observable<IStockEntity[]>
    selectedItemsQty! :number
    tempInvoiceOBJControl= new FormControl('')
  
    // isUpdate: boolean =this.data.isUpdate
   
    constructor(
        private matDialogRef:MatDialogRef<ProductSelectionToCartFormComponent>,
        private stockService :StockService,
        private toastr: ToastrService,
        private productCartService:ProductCartService,
        private matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        
       this.stockDataList = GLOBAL_LIST.STOCK_DATA
    //    console.log("On the constructor ", this.stockDataList)
       
        this.productSelectionForm=new FormGroup({
            proCartId:new FormControl,
            stockOBJ:new FormControl(Validators.required),
            quantity:new FormControl([Validators.required,]),
            //#cmt  qty validation has been done below, since the qty for selection will only be filtered from the list once the stock has been selected 
            discount:new FormControl(0.0,Validators.required),
            netAmount:new FormControl(null),
            total:new FormControl(null),
            tempInvoiceOBJ:new FormControl(), 
            // confirmInvoiceOBJ:new FormControl()
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
            const currentQty = control.value;
            if(currentQty <=0){
                return this.toastr.warning("Add a valid input")
            }
            if (this.data.title==="Add") {
                if( currentQty && currentQty > selectedItemsQty){
                    this.toastr.warning("Quantity should be either below or equals to "+selectedItemsQty)
                    return { 'exceedsQty': true };  
                }              
             }else if(this.data.title==="Update"){
                const existingInThecart = this.data.selectedRowData.quantity
                let qtyDiff = currentQty - existingInThecart
                if(qtyDiff > selectedItemsQty){
                    this.toastr.warning("Quantity should be either below or equals to "+(selectedItemsQty + existingInThecart))
                    return { 'exceedsQty': true };  
                }
                
             }
            return null;
        };
    }

    

    selectOperation(){
        this.setvaluesToOBJFields()
        if(this.data.title ==="Add"){
            this.productCartService.regiterReq(this.productSelectionForm.value).subscribe(res=>{
                console.log("response ",res)
                this.getAllStockData()
                this.matDialogRef.close()
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

    getAllCartData(){
        this.productCartService.getAll(this.data?.selectedRowData?.tempInvoiceOBJ?.tempInvoiceId).subscribe((res)=>{
            GLOBAL_LIST.PRODUCTCART_DATA = res.result[0]
        })
    }

    updatePopTrigger() {
        this.setInvoiceDetailsForUpdation()
        const extraData = {
            title: this.data.title,
            subTitle: "are you sure you want to update the selected data?",
        }
        const openActionPop = this.matDialog.open(ActionPopComponent, { data: extraData, panelClass:"custom-dialog-container" })
        openActionPop.afterClosed().subscribe((state:boolean) => {
            if(!state)return;
            this.productCartService.update(this.productSelectionForm.value).subscribe((res)=>{             
                this.matDialogRef.close()
                this.toastr.success(res.successMessage)
            })
          
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
            this.quantityValidator(qty)
        ]);
        this.productSelectionForm.get('quantity')?.updateValueAndValidity();
        // end
    } 

     getSelectedProduct_sList(stockId: number){
        this.selectedProduct =  this.stockDataList.filter(list=>list?.stockId === stockId);
        // once the product has been selected the number of qty available of the product will get selected, stockId selected from the Blur property
        this.selectedItemsQty = this.selectedProduct?.[0]?.quantity
        this.initializeQtyValidation(this.selectedItemsQty)
    }
    
    setTotal(){
        const sellPrice = this.selectedProduct?.[0]?.sellingPrice
        const qtyControl = this.productSelectionForm.get('quantity')
        const totalControl = this.productSelectionForm.get('total')
        const netAmountControl = this.productSelectionForm.get('netAmount')
        const discountControl = this.productSelectionForm.get('discount')
        qtyControl?.valueChanges.subscribe(qty => {
            totalControl?.patchValue(qty*sellPrice)
            if (discountControl){
                const discountVal = discountControl.value
                let TotalDiscount = discountVal * qty
                let netAmount = totalControl?.value - TotalDiscount
                netAmountControl?.patchValue(netAmount)
            }
        });      
    }
    setNetAmount(){
        const qtyControl = this.productSelectionForm.get('quantity')
        const totalControl = this.productSelectionForm.get('total')
        const netAmountControl = this.productSelectionForm.get('netAmount')
        const discountControl = this.productSelectionForm.get('discount')
        discountControl?.valueChanges.subscribe(discount=>{
            let TotalDiscount = discount * qtyControl?.value
            let netAmount = totalControl?.value - TotalDiscount
            netAmountControl?.patchValue(netAmount)
        })
       
    }
    private setvaluesToOBJFields(){
       let cartValue = this.productSelectionForm.value;
       cartValue.stockOBJ = {stockId:this.stockOBJControl.value}
       cartValue.stockOBJ.categoryOBJ={categoryId:this.selectedItemsQty = this.selectedProduct?.[0]?.categoryOBJ.categoryId}
       cartValue.tempInvoiceOBJ = {tempInvoiceId:this.data.selectedInvoiceId}  
    //    cartValue.confirmInvoiceOBJ = {confirmInvoiceId:this.data.selectedInvoiceId}
       cartValue.tempInvoiceOBJ.customerOBJ={custId:this.data.customerId}
    //    cartValue.confirmInvoiceOBJ.customerOBJ={custId:this.data.customerId}
    }

    private setInvoiceDetailsForUpdation(){
        let cartValue = this.productSelectionForm.value;
        cartValue.tempInvoiceOBJ = this.data.selectedRowData.tempInvoiceOBJ
        cartValue.stockOBJ = this.data.selectedRowData.stockOBJ
        // cartValue.confirmInvoiceOBJ = this.data.selectedRowData.confirmInvoiceOBJ
    }
    

    
   
}