import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsServiceService {
    private baseUrl = 'http://localhost:8080/api/reports'
  constructor(private http:HttpClient) { }


  selectSalesReportWithInRange(startDate:any, endDate:any){
    const formattedStartDate = moment(startDate).format('YYYY-MM-DDTHH:mm:ss');
    const formattedEndDate = moment(endDate).format('YYYY-MM-DDTHH:mm:ss');
    const url = `${this.baseUrl}/selectSalesReportWithInRange`;
    let params = new HttpParams()
    .set('startDate', formattedStartDate)
    .set('endDate', formattedEndDate);

  return this.http.get<any>(url,{params:params,responseType:'json'});
  
  }
  selectPurchaseReportWithInRange(startDate:any, endDate:any){
    const formattedStartDate = moment(startDate).format('YYYY-MM-DDTHH:mm:ss');
    const formattedEndDate = moment(endDate).format('YYYY-MM-DDTHH:mm:ss');
    const url = `${this.baseUrl}/selectPurchaseReportWithInRange`;
    let params = new HttpParams()
    .set('startDate', formattedStartDate)
    .set('endDate', formattedEndDate);

  return this.http.get<any>(url,{params:params,responseType:'json'});
  
  }
}
