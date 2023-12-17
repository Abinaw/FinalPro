import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistrationForm } from 'src/app/Template/auth-forms/registration-form/userRegistration-form.component';


@Injectable({
  providedIn: 'root'
})
export class UserService {
   
   
    private baseUrl = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  regiterReq(regReq: UserRegistrationForm):Observable<any>{
    const url = `${this.baseUrl}/user/register`;
    return this.http.post<UserRegistrationForm>(url,regReq,{responseType :'text' as 'json'})
  }

  getAllUser(){
    const url = `${this.baseUrl}/user/getAll`;
    return this.http.get<any[]>(url);
  }

  deleteUserDetails(userId:any) {
       const url =`${this.baseUrl}/user/deleteUser/${userId}`;
       return this.http.delete<any>(url);
  }

  updateUserDetails() {
    console.log("Updated")
    // const url = `${this.baseUrl}/user/register`;
    // return this.http.post<UserRegistrationForm>(url,data,{responseType :'text' as 'json'})
 }
}
