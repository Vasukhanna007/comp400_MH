import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit{
  formValue !: FormGroup;
  employeeModelObj: EmployeeModel=new EmployeeModel();
  employeeData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor( private formbuilder: FormBuilder,private api: ApiService){}

  ngOnInit(): void{
    this.formValue = this.formbuilder.group({
      name: [''],
      dob:[''],
      gender:[''],
      email: [''],
      phone: [''],
      language: [''],
      medical: ['']
    })
    this.getAllPatients();
  }
  clickAddPatient(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate= false;

  }
  postPatientDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.dob = this.formValue.value.dob;
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.language = this.formValue.value.language;
    this.employeeModelObj.medicalHistory = this.formValue.value.medicalHistory;

    this.api.postPatient(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Succeessfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllPatients();

    },
    err=>{
      alert("something went wrong")
    })


  }
  getAllPatients(){
    this.api.getPatient()
    .subscribe(res=>{
      this.employeeData=res;
    })
}
deletePatient(row: any){
  this.api.deletePatient(row.id).subscribe(res=>{
    alert("Employee Deleted")
    this.getAllPatients();
  })
}
onEdit(row:any){
  this.showAdd = false;
  this.showUpdate= true;
  this.employeeModelObj.id = row.id;

  this.formValue.controls['name'].setValue(row.name)
  this.formValue.controls['dob'].setValue(row.dob)
  this.formValue.controls['gender'].setValue(row.gender)

  this.formValue.controls['email'].setValue(row.email)

  this.formValue.controls['phone'].setValue(row.phone)

  this.formValue.controls['language'].setValue(row.language)
  this.formValue.controls['medicalHistory'].setValue(row.medicalHistory)
}

updatePatientDetails(){
  this.employeeModelObj.name = this.formValue.value.name;
  this.employeeModelObj.dob = this.formValue.value.dob;
  this.employeeModelObj.gender = this.formValue.value.gender;
  this.employeeModelObj.email = this.formValue.value.email;
  this.employeeModelObj.phone = this.formValue.value.phone;
  this.employeeModelObj.language = this.formValue.value.language;
  this.employeeModelObj.medicalHistory = this.formValue.value.medicalHistory;
  this.api.updatePatient(this.employeeModelObj,this.employeeModelObj.id)
  .subscribe(res => {
    alert("Updated Successfully");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllPatients();
  })
}


}
