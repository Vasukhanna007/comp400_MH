import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { AppointmentModel } from './appointment.model';
import {FormBuilder, FormGroup} from '@angular/forms'
// import { Papa } from "ngx-papaparse";

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  public successMsg!: string;
  public errorMsg!: string;
  public appointmentsObj:AppointmentModel= new AppointmentModel();
  AppointmentData !: any;
  formValue !: FormGroup;
  allDoctor!: any[]; // parsed CSV data
  selectedDoctor: any; // selected doctor from the dropdown



  constructor(private api: ApiService,private formbuilder: FormBuilder, private http: HttpClient){}

  ngOnInit(): void {
    // this.http.get("/path/to/doctors.csv", { responseType: "text" }).subscribe(
    //   (csv) => {
    //     // parse the CSV data
    //     this.papa.parse(csv, {
    //       header: true,
    //       complete: (result) => {
    //         // this.doctors = result.data;
    //       },
    //     });
    //   }
    // );
    this.formValue = this.formbuilder.group({
      // date:[''],
      patientName: [''],
      doctorName: [''],
      appointmentDate: ['']

    })
  }
  createAppointment(){
    this.appointmentsObj.patientName = this.formValue.value.patientName;
     this.appointmentsObj.doctorName = this.formValue.value.doctorName;
     this.appointmentsObj.appointmentDate = this.formValue.value.appointmentDate;

     this.api.postAppointment(this.appointmentsObj)
    .subscribe(res=>{
      console.log(res);
      this.successMsg = `Appointment Booked Successfully for ${this.appointmentsObj.appointmentDate}`;
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllAppointments();
    },
    err=>{
      this.errorMsg = "something went wrong"
    })


  }  // createAppointment(){
  //   this.successMsg = '';
  //   this.errorMsg = '';
  //   this.appointmentsObj.patientName = this.formValue.value.patientName;
  //   this.appointmentsObj.doctorName = this.formValue.value.doctorName;

  //   // this.appointmentsObj.date = this.formValue.value.date;

  //   // this.appointmentsObj.email = this.formValue.value.email;

  //   this.api.postAppointment(this.appointmentsObj)
  //   .subscribe(res=>{
  //     this.successMsg = `Appointment Booked Successfully for ${this.appointmentsObj.date}`;
  //     let ref = document.getElementById('cancel')
  //     ref?.click();
  //     this.formValue.reset();
  //     this.getAllAppointments();
  //   },
  //   err=>{
  //     this.errorMsg = "something went wrong"
  //   })


  // }
  getAllAppointments(){
    this.api.getAppointment()
    .subscribe(res=>{
      this.AppointmentData=res;
    })
  }

  deleteAppointment(row: any){
    this.api.deleteAppointment(row.appointmentId).subscribe(res=>{
      alert("Appointment Deleted")
      this.getAllAppointments();
    })
  }


}
