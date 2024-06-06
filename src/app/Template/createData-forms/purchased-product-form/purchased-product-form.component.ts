import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, debounceTime, map, startWith } from "rxjs";
import { GLOBAL_LIST } from "src/app/constants/GlobalLists";
import { IStockEntity } from "src/app/constants/interfaces/IStockEntity";
import { TempPurchaseService } from "src/app/service/tempPurchase-service/temp-purchase.service";
import { TempPurchaseCartService } from "./../../../service/tempPurchaseCart-service/temp-purchase-cart.service";
import { ToastrService } from "ngx-toastr";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActionPopComponent } from "src/app/custom-components/action-cell/action-pop/action-pop.component";

@Component({
    selector: "app-purchased-product-form",
    templateUrl: "./purchased-product-form.component.html",
    styleUrls: ["./purchased-product-form.component.css"],
})
export class PurchasedProductFormComponent {
    purchaseProductCartForm: FormGroup;
    stockOBJControl = new FormControl("");
    stockDataList!: IStockEntity[];
    filterOptions!: Observable<IStockEntity[]>;
    tempPurchaseOBJControl = new FormControl("");
    
    selectedItemsQty!: number;
    selectedPurchase!: any;
    selectedProduct!: any
    // purchaseProductCartForm: FormGroup<any>;

    constructor(
        private tempPurchaseService: TempPurchaseService,
        private tempPurchaseCartService: TempPurchaseCartService,
        private toastr: ToastrService,
        private matDialogRef: MatDialogRef<PurchasedProductFormComponent>,
        private matDialog:MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.stockDataList = GLOBAL_LIST.STOCK_DATA;
        this.purchaseProductCartForm = new FormGroup({
            productCartId: new FormControl(),
            stockOBJ: new FormControl(Validators.required),
            quantity: new FormControl([Validators.required]),
            discount: new FormControl("", Validators.required),
            netAmount: new FormControl(null),
            grossAmount: new FormControl(null),
            tempPurchaseOBJ: new FormControl(),
        });
        this.getAllPurchaseInvoice();
    }

    ngOnInit() {
        if (this.data.title === "Update") {
            this.selectedProduct = this.data.selectedRowData.stockOBJ
            this.setDataToInputForUpdation();
            // this.setvaluesToOBJFields()
        }
        this.filterOptions = this.stockOBJControl.valueChanges.pipe(
            startWith(""),
            map((value) => this.listFilter(value || ""))
        );
    }
    private setDataToInputForUpdation() {
        this.purchaseProductCartForm.patchValue({
            productCartId: this.data.selectedRowData.productCartId,
            discount: this.data.selectedRowData.discount,
            netAmount: this.data.selectedRowData.netAmount,
            quantity: this.data.selectedRowData.quantity,
            grossAmount: this.data.selectedRowData.grossAmount,
        });
        this.stockOBJControl.patchValue(
            this.data.selectedRowData.stockOBJ.stockId
        );
        // let cartValue = this.purchaseProductCartForm.value;
        // cartValue.stockOBJ = this.data.selectedRowData.stockOBJ;
        // cartValue.tempPurchaseOBJ = this.data.selectedRowData.tempPurchaseOBJ;
    }

    private listFilter(value: string): IStockEntity[] {
        if (value) {
            const searchValue = value.toString().toLowerCase();
            return this.stockDataList.filter(
                (option) =>
                    option.itemName.toLowerCase().includes(searchValue) ||
                    option.stockId
                        .toString()
                        .toLowerCase()
                        .includes(searchValue)
            );
        } else {
            return (this.stockDataList = GLOBAL_LIST.STOCK_DATA);
        }
    }

    getAllPurchaseInvoice() {
        this.tempPurchaseService.getAllTempPurchase().subscribe((res) => {
            this.selectedPurchase = res?.result?.[0];
        });
    }

    selectOperation() {
        if (this.data.title === "Insert") {
            this.setOBJFieldsForInsertion()
           
        this.tempPurchaseCartService
            .createPurchaseInvoice(this.purchaseProductCartForm.value)
            .subscribe((response) => {
                this.toastr.success(response.successMessage);
                this.matDialogRef.close();
            });
        }else if (this.data.title === "Update") {
            this.updatePopTrigger();
        }
    }

    updatePopTrigger() {
        this.setvaluesToOBJFields()
        const extraData = {
            title: this.data.title,
            subTitle: "are you sure you want to update the selected data?",
        };
        const openActionPop = this.matDialog.open(ActionPopComponent, {
            data: extraData,
            panelClass: "custom-dialog-container",
        });
        openActionPop.afterClosed().subscribe((state: boolean) => {
            if (!state) return;
            this.tempPurchaseCartService
                .updateTempPurchaseCartRecord(this.purchaseProductCartForm.value)
                .subscribe((res) => {
                    this.matDialogRef.close();
                    this.toastr.success(res.successMessage);
                });
        });
    }

    setOBJFieldsForInsertion(){
        let cartValue = this.purchaseProductCartForm.value;
        cartValue.tempPurchaseOBJ = this.selectedPurchase;
        cartValue.stockOBJ = this.selectedProduct?.[0]
        console.log(this.purchaseProductCartForm.value)        
    }


    getSelectedProduct_sList(stockId: number) {
        this.selectedProduct = this.stockDataList.filter(
            (list) => list?.stockId === stockId
        );
    }

    // setTotal() {
    // let sellPrice: number 
    //    if(this.data.title==="Insert"){
    //      sellPrice  = this.selectedProduct?.[0]?.sellingPrice
    //    }else if(this.data.title==="Update"){
    //     sellPrice  = this.selectedProduct?.sellingPrice
    //    }
    //     const qtyControl = this.purchaseProductCartForm.get("quantity");
    //     const totalControl = this.purchaseProductCartForm.get("grossAmount");
    //     const netAmountControl = this.purchaseProductCartForm.get("netAmount");
    //     const discountControl = this.purchaseProductCartForm.get("discount");

       

    //     qtyControl?.valueChanges
    //     .pipe(debounceTime(300))
    //     .subscribe((qty) => {
    //         totalControl?.patchValue(qty * sellPrice);
    //         if (discountControl) {


                
    //             const discountVal = discountControl.value;
    //             let TotalDiscount = discountVal * qty;
    //             let netAmount = totalControl?.value - TotalDiscount;
    //             netAmountControl?.patchValue(netAmount);
    //         }
    //     });
    // }

    setTotal() {
        let sellPrice: number 
           if(this.data.title==="Insert"){
             sellPrice  = this.selectedProduct?.[0]?.sellingPrice
           }else if(this.data.title==="Update"){
            sellPrice  = this.selectedProduct?.sellingPrice
           }
            const qtyControl = this.purchaseProductCartForm.get("quantity");
            const totalControl = this.purchaseProductCartForm.get("grossAmount");
            const netAmountControl = this.purchaseProductCartForm.get("netAmount");
            const discountControl = this.purchaseProductCartForm.get("discount");
    
            qtyControl?.valueChanges
            .pipe(debounceTime(300))
            .subscribe((qty) => {
                totalControl?.patchValue(qty * sellPrice);
                if (discountControl) {
                    const discountVal = discountControl.value;
                    let TotalDiscount = discountVal * qty;
                    let netAmount = totalControl?.value - TotalDiscount;
                    netAmountControl?.patchValue(netAmount);
                }
            });
        }
        
    setNetAmount() {
        let sellPrice: number 
        if(this.data.title==="Insert"){
          sellPrice  = this.selectedProduct?.[0]?.sellingPrice
        }else if(this.data.title==="Update"){
         sellPrice  = this.selectedProduct?.sellingPrice
        }
        const qtyControl = this.purchaseProductCartForm.get("quantity");
        const totalControl = this.purchaseProductCartForm.get("grossAmount");
        const netAmountControl = this.purchaseProductCartForm.get("netAmount");
        const discountControl = this.purchaseProductCartForm.get("discount");
        discountControl?.valueChanges
        .pipe(debounceTime(300))
        .subscribe((discount) => {
            if(discountControl.value.toString().includes("%")){
               let discountPercentagePerUnit =  parseFloat(discount.replace('%','')) ;
                discount = (discountPercentagePerUnit/100) * sellPrice
            }
            let TotalDiscount = discount * qtyControl?.value;
            let netAmount = totalControl?.value - TotalDiscount;
            netAmountControl?.patchValue(netAmount);
            discountControl?.patchValue(discount);
        });
    }


    


    private setvaluesToOBJFields() {
        let cartValue = this.purchaseProductCartForm.value;
        cartValue.stockOBJ = { stockId: this.stockOBJControl.value };
        cartValue.stockOBJ.categoryOBJ = {
            categoryId: (this.selectedProduct?.categoryOBJ.categoryId),
        };
        cartValue.tempPurchaseOBJ = this.data.selectedRowData.tempPurchaseOBJ;
       

    }

    
}
