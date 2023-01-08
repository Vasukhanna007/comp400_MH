import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient ) { }

  postPatient(data:any){
    return this.http.post<any>("http://localhost:3001/patient",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getPatient(){
    return this.http.get<any>("http://localhost:3001/patient");
  }

  updatePatient(data:any, id:number){
    return this.http.put<any>("http://localhost:3001/patient/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deletePatient(id: number){
    return this.http.delete<any>("http://localhost:3001/patient/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postAppointment(data:any){
    return this.http.post<any>("http://localhost:3001/appointment",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getAppointment(){
    return this.http.get<any>("http://localhost:3001/appointment")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteAppointment(id: number){
    return this.http.delete<any>("http://localhost:3001/appointment/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  auth(data:any){
    return this.http.post<any>("http://localhost:3001/auth",data)
    .pipe(map((res:any)=>{
      return res;
    }))

  }



}
