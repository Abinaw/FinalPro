import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestoreService {
    private baseUrl = 'http://localhost:8080/api/restore';

    constructor(private http: HttpClient) { }
  
    restoreDatabase(file: any): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
  
      const headers = new HttpHeaders({
       
      });
  
      return this.http.post<any>(this.baseUrl, formData,
       {responseType: 'text' as 'json' }
      );
    }
}
