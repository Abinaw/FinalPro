import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistrationForm } from 'src/app/Template/auth-forms/registration-form/userRegistration-form.component';
import { AudioService } from '../audio-service/audio-service.service';


@Injectable({
  providedIn: 'root'
})

export class UserService {
    
   
    private baseUrl = 'http://localhost:8080/user';
    


  constructor(private http:HttpClient, public audService :AudioService,) { }
  
 

  regiterReq(regReq: any):Observable<any>{
    // this.audService.playSoundInsert()
    const url = `${this.baseUrl}/register`;
    return this.http.post<any>(url,regReq,{responseType :'text' as 'json'})
  }

  getAllUser():Observable<any>{
    const url = `${this.baseUrl}/getAll`;
    return this.http.get<any[]>(url);
  }

  deleteUser(userId:any) {
    // this.audService.playSoundDelete()
       const url =`${this.baseUrl}/deleteUser/${userId}`;
       return this.http.delete<any>(url);
  }

  updateUserDetails(updateRequestData: UserRegistrationForm):Observable<any>{
    // this.audService.playSoundUpdate()
    const url = `${this.baseUrl}/updateUser`;
    return this.http.put<UserRegistrationForm>(url,updateRequestData,{responseType :'text' as 'json'})
  }

  findData(dataChar:any) {
    const url = `${this.baseUrl}/selectUsers/${dataChar}`;
    return this.http.get<any>(url)
  }
}

