import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/Template/createData-forms/login-compo/LoginRequest';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/api/authentication/login';


  logInReq(data:LoginRequest):Observable<any>{
    const url = `${this.baseUrl}`;
    return this.http.post<LoginRequest>(url, data,{responseType:'text' as 'json'});
  }

  settoken(token:Array<string>):void{
    localStorage.setItem("key",token.toLocaleString());
  }

}
