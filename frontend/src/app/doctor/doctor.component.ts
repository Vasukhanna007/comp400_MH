import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiService } from '../shared/api.service';
import { DoctorModel } from './doctor.model';
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  formValue !: FormGroup;
  doctorObj: DoctorModel = new DoctorModel();
  doctorData!:any;
  showAdd!: boolean;
  showUpdate!: boolean;


constructor(private api: ApiService,private formbuilder: FormBuilder){}
isAdmin:boolean=this.api.admin
ngOnInit(): void{
  this.formValue = this.formbuilder.group({
    name: [''],
    dob:[''],
    gender:[''],
    email: [''],
    phone: [''],
    language: [''],
    certifications: [''],
    speciality:['']
  })
this.getAllDoctors();
}

clickAddDoctor(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate= false;

}

postDoctorDetails(){
  this.doctorObj.name = this.formValue.value.name;
  this.doctorObj.dob = this.formValue.value.dob;
  this.doctorObj.gender = this.formValue.value.gender;
  this.doctorObj.email = this.formValue.value.email;
  this.doctorObj.phone = this.formValue.value.phone;
  this.doctorObj.language = this.formValue.value.language;
  this.doctorObj.certifications = this.formValue.value.certifications;
  this.doctorObj.speciality = this.formValue.value.speciality;

  this.api.postDoctor(this.doctorObj)
  .subscribe(res=>{
    console.log(res);
    alert("Employee Added Succeessfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllDoctors();

  },
  err=>{
    alert("something went wrong")
  })


}





getAllDoctors(){
  this.api.getDoctor()
  .subscribe(res=>{
    console.log(res);
    this.doctorData=res;
  })
}

}




