import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { GLOBAL_LIST } from 'src/app/constants/GlobalLists';
import { IVendorEntity } from 'src/app/constants/interfaces/IVendorEntity';
import { TempPurchaseService } from 'src/app/service/tempPurchase-service/temp-purchase.service';
import { VendorService } from 'src/app/service/vendor-service/vendor.service';
import { PurchasedProductFormComponent } from '../../createData-forms/purchased-product-form/purchased-product-form.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css','../../../../assets/CSS/ComponentCommDesign.css']
})
export class PurchaseComponent implements OnInit {


purchaseInvocieForm: FormGroup 
vendorControl = new FormControl('');
vendorDataList:IVendorEntity[] 
filterOptions!:Observable<IVendorEntity[]>
isValid: boolean;
constructor(
    private tempPurchaseInvoice : TempPurchaseService,
    private matDialog:MatDialog,
){
    this.isValid =false
    this.vendorDataList = GLOBAL_LIST.VENDOR_DATA;
    this.purchaseInvocieForm = new FormGroup({
        purchaseInvoiceNO:new FormControl(null,Validators.required),
        vendorOBJ: new FormControl({},Validators.required),
        purchasedDate:new FormControl({},Validators.required),

    })
    
}

// validatePurchaseInvoice(){
//     let invoice = this.purchaseInvocieForm.get('invoiceRef')
//     let vendor = this.purchaseInvocieForm.get('vendorOBJ')
//     let timeStamp = this.purchaseInvocieForm.get('timeStamp')
//         if(invoice?.value !=null && vendor?.value!=null && timeStamp?.value!=null){
//                 this.isValid = true
//                 return
//         }
//         // invoice?.setValue(null)
//         // vendor?.setValue(null)
//         // timeStamp?.setValue(null)
//         this.isValid = false
// }

    ngOnInit(): void {
        this.filterOptions = this.vendorControl.valueChanges.pipe(
            startWith(''), 
            map(value => this.listFilter(value || '')
            )
            
        )
    }
    listFilter(value: string): IVendorEntity[] {
        const searchValue = value.toString().toLowerCase();

        return this.vendorDataList.filter(
            option=>
                option.vendorName.toLowerCase().includes(searchValue)||
                option.vendorId.toString().toLowerCase().includes(searchValue)
                
        )
    }

    createTempPurchase() {
    this.purchaseInvocieForm.value.vendorOBJ = {vendorId:this.vendorControl.value}
    // console.log(this.purchaseInvocieForm.value)
      this.tempPurchaseInvoice.createPurchaseInvoice(this.purchaseInvocieForm.value).subscribe(res=>{
        console.log(res)
      })
    }
    
    openPurchaseCartForm() {
        const openForm = this.matDialog.open(PurchasedProductFormComponent,{panelClass:["invoice-dialog-container"],})
    }
}
