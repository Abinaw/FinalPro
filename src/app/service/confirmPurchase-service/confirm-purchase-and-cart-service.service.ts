import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPurchaseAndCartServiceService {
    private baseUrl = "http://localhost:8080/api/confirmPurchase";

    constructor(private http: HttpClient) {}

    addToConfirmPurchase(purchaseId: number): Observable<any> {
        // this.audService.playSoundInsert()
        const url = `${this.baseUrl}/addToConfirmPurchase`;
        return this.http.post<any>(url, purchaseId, { responseType: "json" });
    }
}