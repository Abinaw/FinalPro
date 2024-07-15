import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SalesInvocieChequeService } from '../salesInvoiceCheque-service/sales-invocie-cheque.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private dueChequeDataSubject = new BehaviorSubject<any[]>([]);
    dueChequeData$: Observable<any[]> = this.dueChequeDataSubject.asObservable();
  
    constructor(private salesInvoiceChequeService: SalesInvocieChequeService) {}
  
    fetchDueCheques() {
        const token = localStorage.getItem('token'); // or wherever you store the token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    
        this.salesInvoiceChequeService.getAllConfirmedSalesInvoiceCheques(headers).subscribe(res => {
          if (res?.result) {
            this.dueChequeDataSubject.next(res.result);
          }
        }, error => {
          console.error('Error fetching due cheques', error);
        });
      }
    
      clearData() {
        this.dueChequeDataSubject.next([]);
      }
}
