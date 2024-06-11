import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    NgZone,
    ChangeDetectorRef,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Observable, map, startWith } from "rxjs";
import { GLOBAL_LIST } from "src/app/constants/GlobalLists";
import { IVendorEntity } from "src/app/constants/interfaces/IVendorEntity";
import { TempPurchaseService } from "src/app/service/tempPurchase-service/temp-purchase.service";
import { VendorService } from "src/app/service/vendor-service/vendor.service";
import { PurchasedProductFormComponent } from "../../createData-forms/purchased-product-form/purchased-product-form.component";
import { ITempPurchaseInvoice } from "src/app/constants/interfaces/ITempPurchaseInvoiceEntity";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { PurchaseInvoiceFormComponent } from "../../createData-forms/purchase-invoice-form/purchase-invoice-form.component";
import { Router } from "@angular/router";
import { PurchaseCartComponent } from "../purchase-cart/purchase-cart.component";
import { StockService } from "src/app/service/stock-service/stock.service";

@Component({
    selector: "app-purchase",
    templateUrl: "./purchase.component.html",
    styleUrls: [
        "./purchase.component.css",
        "../../../../assets/CSS/ComponentCommDesign.css",
    ],
})
export class PurchaseComponent implements OnInit {
    purchaseList: ITempPurchaseInvoice[] = [];
    isLoaded: boolean = false;

    constructor(
        private vendorService: VendorService,
        private tempPurchaseInvoiceService: TempPurchaseService,
        private matDialog: MatDialog,
        private cdr: ChangeDetectorRef,
        private stockService: StockService
    ) {
        this.loadAllPurchase();
        this.purchaseList = GLOBAL_LIST.TEMPPURCHASE_DATA;
        this.loadAllVendor();
    }

    ngOnInit(): void {
        // this.loadAllPurchase();
        this.loadAllStock();
    }

    loadAllPurchase() {
        this.isLoaded = false;
        this.tempPurchaseInvoiceService
            .getAllTempPurchase()
            .subscribe((response) => {
                GLOBAL_LIST.TEMPPURCHASE_DATA = response?.result;
                this.purchaseList = response?.result;
                this.isLoaded =
                    response?.result && response?.result?.length ? true : false;
                this.cdr.detectChanges();
            });
    }

    loadAllVendor() {
        this.vendorService.getAll().subscribe((res) => {
            GLOBAL_LIST.VENDOR_DATA = res;
        });
    }

    loadAllStock() {
        this.stockService.getAll().subscribe((res) => {
            GLOBAL_LIST.STOCK_DATA = res;
        });
    }

    // setPurchaseDetailsToFields() {
    //     console.log("list2 ", this.purchaseList)
    //     this.invoiceId = this.purchaseList.purchasedDate
    //     console.log(this.invoiceId)
    //     const vendorId = this.purchaseList.vendorOBJ.vendorId
    //     const vendorName = this.purchaseList.vendorOBJ.vendorName

    //     // const vendorname = this.purchaseList[0].vendorOBJ.vendorName
    //     // const purchaseId = this.purchaseList[0].
    //     // const purchaseInvoiceNo = this.purchaseList.purchaseInvoiceNO
    //     // const purchasedDate = this.purchaseList.purchasedDate
    //     if(this.purchaseList){
    //         this.refNo.nativeElement.innerHTML = this.purchaseList.purchaseInvoiceNO;
    //         this.vendorOBJ.nativeElement.innerHTML =vendorId +" | "+ vendorName;
    //         this.InvoiceDate.nativeElement.innerHTML = this.purchaseList.purchasedDate;
    //     }
    // }

    openPurchaseInvoiceForm() {
        const purchaseFormOpen = this.matDialog.open(
            PurchaseInvoiceFormComponent,
            {
                panelClass: ["custom-dialog-container", "custom-form"],
            }
        );
        purchaseFormOpen.afterClosed().subscribe((res) => {
            this.loadAllPurchase();
        });
    }

    // openPurchaseCartForm(purchaseInvoiceDetails: any) {
    //     const openForm = this.matDialog.open(PurchaseCartComponent, {
    //         data: purchaseInvoiceDetails,
    //         panelClass: ["custom-dialog-container", "temp-purchase-cart"],
    //         maxHeight: "80vh",
    //     });
    // }
}
