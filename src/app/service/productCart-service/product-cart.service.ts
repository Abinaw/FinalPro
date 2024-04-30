import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AudioService } from '../audio-service/audio-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {

    private baseUrl = 'http://localhost:8080/api/productCart';
    
  constructor(private http:HttpClient, public audService :AudioService,) { }
  
 

  regiterReq(regReq: any):Observable<any>{
    // this.audService.playSoundInsert()
    const url = `${this.baseUrl}/register`;
    return this.http.post<any>(url,regReq,{responseType :'text' as 'json'})
  }

  getAll(invoiceId:any):Observable<any>{
    const url = `${this.baseUrl}/getAll/${invoiceId}`;
    return this.http.get<any[]>(url,{responseType:'json'});
  }

  delete(invoiceId:any) {
    // this.audService.playSoundDelete()
       const url =`${this.baseUrl}/delete/${invoiceId}`;
       return this.http.delete<any>(url,{responseType :'json'});
  }

  update(updateRequestData: any):Observable<any>{
    // this.audService.playSoundUpdate()
    const url = `${this.baseUrl}/update`;
    return this.http.put<any>(url,updateRequestData,{responseType :'json'})
  }

  findData(dataChar:any) {
    const url = `${this.baseUrl}/select/${dataChar}`;
    return this.http.get<any>(url,{responseType:'json'})
  }
}
