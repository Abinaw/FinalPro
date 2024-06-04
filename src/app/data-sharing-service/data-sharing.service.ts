import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TempPurchaseService } from '../service/tempPurchase-service/temp-purchase.service';
import { ITempPurchaseInvoice } from '../constants/interfaces/ITempPurchaseInvoiceEntity';
@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

    purchaseData$ = new BehaviorSubject<ITempPurchaseInvoice[]>([]);


  constructor( private tempPurchaseInvoiceService: TempPurchaseService,) { }

  loadAllPurchase(){
    this.tempPurchaseInvoiceService.getAllTempPurchase().subscribe(response=>{
       let data = response.result
    //    GLOBAL_LIST.TEMPPURCHASE_DATA = response?.result
    })

}
//   changeMessage()
}
