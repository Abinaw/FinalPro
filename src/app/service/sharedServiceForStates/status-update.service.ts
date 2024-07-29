import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITempPurchaseCartEntity } from 'src/app/constants/interfaces/ITempPurchaseCartEntity';

@Injectable({
  providedIn: 'root'
})
export class StatusUpdateService {
    private purchaseCartSubject = new BehaviorSubject<ITempPurchaseCartEntity[]>([]);
    purchaseCart$ = this.purchaseCartSubject.asObservable();
  
    updatePurchaseInvoiceCart(purchaseCart: ITempPurchaseCartEntity[]) {
      this.purchaseCartSubject.next(purchaseCart);
    }
}
