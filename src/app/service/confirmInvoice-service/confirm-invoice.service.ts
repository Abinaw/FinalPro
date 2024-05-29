import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AudioService } from '../audio-service/audio-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmInvoiceService {
    private baseUrl = 'http://localhost:8080/api/confirmInvoice';

   constructor(private http:HttpClient, public audService :AudioService,) { }
  
 

  addToConfirmInovie(invoiceId: number):Observable<any>{
    // this.audService.playSoundInsert()
    const url = `${this.baseUrl}/addToConfirmInvoice`;
    return this.http.post<any>(url,invoiceId,{responseType :'json'})
    
  }

//   getAll(invoiceId:any):Observable<any>{
//     const url = `${this.baseUrl}/getAll/${invoiceId}`;
//     return this.http.get<any[]>(url,{responseType:'json'});
//   }
}
