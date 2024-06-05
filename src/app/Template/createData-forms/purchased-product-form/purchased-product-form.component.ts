import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, map, startWith } from "rxjs";
import { GLOBAL_LIST } from "src/app/constants/GlobalLists";
import { IStockEntity } from "src/app/constants/interfaces/IStockEntity";
import { TempPurchaseService } from "src/app/service/tempPurchase-service/temp-purchase.service";
import { TempPurchaseCartService } from "./../../../service/tempPurchaseCart-service/temp-purchase-cart.service";
import { ToastrService } from "ngx-toastr";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

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
    selectedProduct!: any;
    selectedItemsQty!: number;
    selectedPurchase!: any;
    // purchaseProductCartForm: FormGroup<any>;

    constructor(
        private tempPurchaseService: TempPurchaseService,
        private tempPurchaseCartService: TempPurchaseCartService,
        private toastr: ToastrService,
        private matDialogRef: MatDialogRef<PurchasedProductFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.stockDataList = GLOBAL_LIST.STOCK_DATA;
        this.purchaseProductCartForm = new FormGroup({
            productCartId: new FormControl(),
            stockOBJ: new FormControl(Validators.required),
            quantity: new FormControl([Validators.required]),
            discount: new FormControl(0.0, Validators.required),
            netAmount: new FormControl(null),
            grossAmount: new FormControl(null),
            tempPurchaseOBJ: new FormControl(),
        });
        this.getAllPurchaseInvoice();
    }

    ngOnInit() {
        if (this.data.title === "Update") {
            this.setDataToInputForUpdation();
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
        let cartValue = this.purchaseProductCartForm.value;
        cartValue.stockOBJ = this.data.selectedRowData.stockOBJ;
        cartValue.tempPurchaseOBJ = this.data.selectedRowData.tempPurchaseOBJ;
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
        console.log(this.purchaseProductCartForm.value);
        // this.setvaluesToOBJFields();
        this.tempPurchaseCartService
            .createPurchaseInvoice(this.purchaseProductCartForm.value)
            .subscribe((response) => {
                this.toastr.success(response.successMessage);
            });
        this.matDialogRef.close();
    }

    setTotal() {
        console.log("selected row data", this.data.selectedRowData);
        const sellPrice = this.selectedProduct?.[0]?.sellingPrice;
        const qtyControl = this.purchaseProductCartForm.get("quantity");
        const totalControl = this.purchaseProductCartForm.get("grossAmount");
        const netAmountControl = this.purchaseProductCartForm.get("netAmount");
        const discountControl = this.purchaseProductCartForm.get("discount");
        qtyControl?.valueChanges.subscribe((qty) => {
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
        const qtyControl = this.purchaseProductCartForm.get("quantity");
        const totalControl = this.purchaseProductCartForm.get("grossAmount");
        const netAmountControl = this.purchaseProductCartForm.get("netAmount");
        const discountControl = this.purchaseProductCartForm.get("discount");
        discountControl?.valueChanges.subscribe((discount) => {
            let TotalDiscount = discount * qtyControl?.value;
            let netAmount = totalControl?.value - TotalDiscount;
            netAmountControl?.patchValue(netAmount);
        });
    }

    // private setvaluesToOBJFields() {
    //     let cartValue = this.purchaseProductCartForm.value;
    //     cartValue.stockOBJ = { stockId: this.stockOBJControl.value };
    //     cartValue.stockOBJ.categoryOBJ = {
    //         categoryId: (this.selectedItemsQty =
    //             this.selectedProduct?.[0]?.categoryOBJ.categoryId),
    //     };
    //     cartValue.tempPurchaseOBJ = this.selectedPurchase;
    // }
}
