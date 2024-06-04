import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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

@Component({
    selector: "app-purchase",
    templateUrl: "./purchase.component.html",
    styleUrls: [
        "./purchase.component.css",
        "../../../../assets/CSS/ComponentCommDesign.css",
    ],
})
export class PurchaseComponent implements OnInit,AfterViewInit{
    purchaseList:ITempPurchaseInvoice[] | undefined 
 
    constructor(
        private vendorService: VendorService,
        private tempPurchaseInvoiceService: TempPurchaseService,
        private matDialog: MatDialog,
        private router:Router
        
    ) {
        // this.loadAllPurchase();
        // this.purchaseList = GLOBAL_LIST.TEMPPURCHASE_DATA
        // this.loadAllVendor();
               
    }
    ngAfterViewInit(): void {
        this.loadAllPurchase();
        console.log(this.purchaseList)
    }


    ngOnInit(): void {
        // this.loadAllPurchase();
        // console.log('list ', this.purchaseList)        
    }

    



    loadAllPurchase(){
        this.tempPurchaseInvoiceService.getAllTempPurchase().subscribe(response=>{
        //    GLOBAL_LIST.TEMPPURCHASE_DATA = response?.result
           this.purchaseList = response?.result
            // console.log("Purchase invoice ,",response?.result)
            // this.purchaseList = response?.result
            // if(response?.result && response?.result.length){
            //     this.purchaseList = response?.result;
            // }
        })
  
    }

    loadAllVendor() {
        this.vendorService.getAll().subscribe((res) => {
            GLOBAL_LIST.VENDOR_DATA = res;
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

openPurchaseInvoiceForm(){
     this.matDialog.open(PurchaseInvoiceFormComponent,{panelClass:['custom-dialog-container','custom-form'],})
}

  
openPurchaseCartForm(purchaseInvoiceDetails: any) {
        const openForm = this.matDialog.open(PurchaseCartComponent, {data:purchaseInvoiceDetails,
            panelClass: ["custom-dialog-container","temp-purchase-cart"],maxHeight:"80vh"
        });
}
}
