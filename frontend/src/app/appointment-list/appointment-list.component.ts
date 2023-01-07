import { Component, OnInit } from '@angular/core';
import { AppointmentModel } from '../appointment/appointment.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit{

  public loading = true;
  public errorMsg!: string;
  public successMsg!: string;
  public appointmentsObj:AppointmentModel= new AppointmentModel();
  AppointmentData !: any;
  public columns = ['appointmentID', 'Patientname', 'doctorname','appointmentDate', 'cancel'];


  // employeeModelObj: EmployeeModel=new EmployeeModel();


  constructor(private api: ApiService){

  }

  ngOnInit(): void {
    this.api.getAppointment()
    .subscribe(res=>{
      console.log(res);

      this.AppointmentData=res;
      this.loading=false;
    }
  ,err=>{
    alert("something went wrong");
    this.loading= false;
  })
  }

  getAllAppointments(){
    this.api.getAppointment()
    .subscribe(res=>{
      console.log(res);
      this.AppointmentData=res;
    })
  }

  cancelAppointment(row: any){
    this.api.deleteAppointment(row.appointmentId).subscribe(res=>{
      alert("Appointment Deleted");
      this.getAllAppointments();
    })



  }



}
