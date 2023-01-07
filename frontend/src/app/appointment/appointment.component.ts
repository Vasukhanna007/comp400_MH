import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { AppointmentModel } from './appointment.model';
import {FormBuilder, FormGroup} from '@angular/forms'

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


  constructor(private api: ApiService,private formbuilder: FormBuilder){}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      date:[''],
      name: [''],
      email: [''],
    })
  }

  createAppointment(){
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentsObj.name = this.formValue.value.name;
    this.appointmentsObj.date = this.formValue.value.date;

    this.appointmentsObj.email = this.formValue.value.email;

    this.api.postAppointment(this.appointmentsObj)
    .subscribe(res=>{
      this.successMsg = `Appointment Booked Successfully for ${this.appointmentsObj.date}`;
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllAppointments();
    },
    err=>{
      this.errorMsg = "something went wrong"
    })


  }
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
