import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AudioService } from '../../audio-service/audio-service.service';
import { IConfirmInvoiceEntity } from 'src/app/constants/interfaces/IConfirmInvoiceEntity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmSalesInvociePaymentService {
    private baseUrl = 'http://localhost:8080/api/ConfirmPayments/';
    
    constructor(private http:HttpClient, public audService :AudioService,) { }
    addToSalesInvoicePayment(salesInvoicePaymentsData: IConfirmInvoiceEntity):Observable<any>{
        // this.audService.playSoundInsert()
        const url = `${this.baseUrl}/addPayment`;
        return this.http.post<any>(url,salesInvoicePaymentsData,{responseType :'json'})
        
      }
}
