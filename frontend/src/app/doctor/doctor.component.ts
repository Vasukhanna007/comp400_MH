import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiService } from '../shared/api.service';
import { DoctorModel } from './doctor.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  doctorObj: DoctorModel = new DoctorModel();
  doctorData!:any;

constructor(private api: ApiService){}

ngOnInit(): void{
this.getAllDoctors();
}




getAllDoctors(){
  this.api.getDoctor()
  .subscribe(res=>{
    console.log(res);
    this.doctorData=res;
  })
}

}




