import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SalesInvocieChequeService } from '../salesInvoiceCheque-service/sales-invocie-cheque.service';
import { HttpHeaders } from '@angular/common/http';
import { PurchaseInvoiceChequeService } from '../purchaseInvoiceCheque-service/purchase-invoice-cheque.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private dueSalesChequeDataSubject = new BehaviorSubject<any[]>([]);
    private duePurchaseChequeDataSubject = new BehaviorSubject<any[]>([]);
    dueSalesChequeData$: Observable<any[]> = this.dueSalesChequeDataSubject.asObservable();
    duePurchaseChequeData$: Observable<any[]> = this.duePurchaseChequeDataSubject.asObservable();
  
    constructor(private salesInvoiceChequeService: SalesInvocieChequeService, private purchaseInvoiceChequeService: PurchaseInvoiceChequeService) {}
  
    fetchDueCheques() {
        const token = localStorage.getItem('token'); 
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    
        this.purchaseInvoiceChequeService.getAllConfirmedPurchaseInvoiceDueCheques(headers).subscribe(res=>{
            if (res?.result) {
                this.duePurchaseChequeDataSubject.next(res.result);
              }
            }, error => {
              console.error('Error fetching Purchase due cheques', error);
        })

        this.salesInvoiceChequeService.getAllConfirmedSalesInvoiceCheques(headers).subscribe(res => {
          if (res?.result) {
            this.dueSalesChequeDataSubject.next(res.result);
          }
        }, error => {
          console.error('Error fetching due cheques', error);
        });
      }
    
      clearData() {
        this.duePurchaseChequeDataSubject.next([]);
        this.dueSalesChequeDataSubject.next([]);
      }
}
