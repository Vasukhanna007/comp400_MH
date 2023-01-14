import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { AppointmentModel } from './appointment.model';
import {FormBuilder, FormGroup} from '@angular/forms'
import { MatFormFieldControl } from '@angular/material/form-field';

// import { Papa } from "ngx-papaparse";

import { HttpClient } from "@angular/common/http";
import { catchError, from, Observable, of } from 'rxjs';

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
  // allDoctor!: any[]; // parsed CSV data
  selectedDoctor: any; // selected doctor from the dropdown
  allDoctors$!: Observable<any>;

//const array of timeslots
timeSlot: string[] = ["8:00","9:00","10:00","11:00","12:00","1:00","2:00","3:00","4:00"];

  constructor(private api: ApiService,private formbuilder: FormBuilder, private http: HttpClient){}

  ngOnInit(): void {
    // this.http.get("/path/to/doctors.csv", { responseType: "text" }).subscribe(
    //   (csv) => {
    //     // parse the CSV data
    //     this.papa.parse(csv, {
    //       header: true,
    //       complete: (result) => {
    //         // this.doctors = result.data;
    // this.allDoctors$ = this.api.getDoctor();
    console.log(this.timeSlot);
    this.allDoctors$ = this.api.getDoctor().pipe(
      catchError(err => of([]))

  );
    // console.log(allDoctor$)

    //       },
    //     });
    //   }

    // );
    this.formValue = this.formbuilder.group({
      // date:[''],
      patientEmail: [''],
      // doctorName: [''],
      appointmentDate: [''],
      // appointmentTime:[''],
      selectedValue:[''],
      slotValue:[]

    })
  }
  // getAllDoctors(){
  //   this.api.getDoctor()
  //   .subscribe(res=>{
  //     console.log("here",res);
  //     this.allDoctors=res;
  //   })
  // }

  createAppointment(){
    this.appointmentsObj.patientEmail = this.formValue.value.patientEmail;
     this.appointmentsObj.doctorName = this.formValue.value.selectedValue;
     this.appointmentsObj.appointmentDate = this.formValue.value.appointmentDate;
     this.appointmentsObj.appointmentTime = this.formValue.value.slotValue;
    //  this.appointmentsObj.appointmentTime = this.formValue.value.appointmentTime;

    console.log(this.appointmentsObj)
     this.api.postAppointment(this.appointmentsObj)
    .subscribe(res=>{
      if(this.appointmentsObj.patientEmail && this.appointmentsObj.doctorName &&this.appointmentsObj.appointmentDate && this.appointmentsObj.appointmentTime){
        this.successMsg = `Appointment Booked Successfully for ${this.appointmentsObj.appointmentDate}`;
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllAppointments();
      }
      //problem appointment doesnt get booked but printing wrong message
      else{
        this.errorMsg = "Input is wrong or apointment isn't available"

      }


    },
    err=>{

      this.errorMsg = "Input is wrong or apointment isn't available"
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
  // getAllAppointmentsByDoctorName(row:any){
  //   this.api.getAppointmentsbydoctor(row.doctorName)
  //   .subscribe(res=>{
  //     this.AppointmentData=res;
  //   })
  // }

  deleteAppointment(row: any){
    this.api.deleteAppointment(row.appointmentId).subscribe(res=>{
      alert("Appointment Deleted")
      this.getAllAppointments();
    })
  }


}
