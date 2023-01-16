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
  isAdmin:boolean=this.api.admin
  isDoctor:boolean=this.api.doctor;
  ngOnInit(): void {
  //   this.api.getAppointment()
  //   .subscribe(res=>{
  //     console.log(res);

  //     this.AppointmentData=res;
  //     this.loading=false;
  //   }
  // ,err=>{
  //   alert("something went wrong");
  //   this.loading= false;
  // })

  // this.api.getAppointmentsbydoctor(this.api.email)
  // .subscribe(res=>{
  //   console.log(res);
  //   this.AppointmentData=res;
  console.log(this.api.email)
  // });
  console.log(this.isDoctor, this.isAdmin)
  if(this.api.admin){
    this.getAllAppointments()
  }
  else if(this.isDoctor){
    this.api.getAppointmentsbydoctor(this.api.email)
    .subscribe(res=>{
    console.log(res);
    this.AppointmentData=res;
  });  }
else{
this.api.getAppointmentsbypatient(this.api.email)
  .subscribe(res=>{
    console.log(res);
    this.AppointmentData=res;
  });
}

  }

  getAllAppointments(){
    this.api.getAppointment()
    .subscribe(res=>{
      console.log(res);
      this.AppointmentData=res;
    })
  }

  getAllAppointmentsByDoctorName(row:any){
    this.api.getAppointmentsbydoctor(row.doctorName)
    .subscribe(res=>{
      console.log(res);
      this.AppointmentData=res;
    })
  }

  cancelAppointment(row: any){
    this.api.deleteAppointment(row.appointmentId).subscribe(res=>{
      alert("Appointment Deleted");
      if(this.isAdmin){
        this.getAllAppointments();
      }
      else if(this.isDoctor){
        this.api.getAppointmentsbydoctor(this.api.email)
    .subscribe(res=>{
    console.log(res);
    this.AppointmentData=res;
  });
      }
      else{
      this.api.getAppointmentsbypatient(this.api.email)
    .subscribe(res=>{
    console.log(res);
    this.AppointmentData=res;
  });
}

      // this.getAllAppointments();

    })



  }



}
