import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AudioService } from '../../audio-service/audio-service.service';
import { Observable } from 'rxjs';
import { IPurchasePaymentEntity } from 'src/app/constants/interfaces/IPurchasePaymentEntity';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPurchasePaymentService {
    private baseUrl = 'http://localhost:8080/api/purchasePayments';
    
    constructor(private http:HttpClient, public audService :AudioService,) { }
    addToPurchaseInvoicePayment(purchasePayData: IPurchasePaymentEntity):Observable<any>{
        // this.audService.playSoundInsert()
        const url = `${this.baseUrl}/addToPurchaseInvoicePayment`;
        return this.http.post<any>(url,purchasePayData,{responseType :'json'})
        
      }

      
}