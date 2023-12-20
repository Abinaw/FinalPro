import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisteredComponent } from 'ag-grid/dist/lib/components/framework/componentProvider';
import { Observable } from 'rxjs';
import { UserRegistrationForm } from 'src/app/Template/auth-forms/registration-form/userRegistration-form.component';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    
   
    private baseUrl = 'http://localhost:8080/user';

  constructor(private http:HttpClient) { }

  regiterReq(regReq: UserRegistrationForm):Observable<any>{
    const url = `${this.baseUrl}/register`;
    return this.http.post<UserRegistrationForm>(url,regReq,{responseType :'text' as 'json'})
  }

  getAllUser(){
    const url = `${this.baseUrl}/getAll`;
    return this.http.get<any[]>(url);
  }

  deleteUserDetails(userId:any) {
       const url =`${this.baseUrl}/deleteUser/${userId}`;
       return this.http.delete<any>(url);
  }

  updateUserDetails(updateRequestData: UserRegistrationForm):Observable<any>{
    const url = `${this.baseUrl}/updateUser`;
    return this.http.put<UserRegistrationForm>(url,updateRequestData,{responseType :'text' as 'json'})
  }

  findData(dataChar:any) {
    const url = `${this.baseUrl}/selectUsers/${dataChar}`;
    return this.http.get<any>(url)
  }
}

