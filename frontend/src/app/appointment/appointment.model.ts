import { DoctorComponent } from '../doctor/doctor.component';
import { DoctorModel } from '../doctor/doctor.model';
import { EmployeeModel } from '../employee-dashboard/employee-dashboard.model';

export class AppointmentModel{
    appointmentId: number =0;
    // patient: EmployeeModel=new EmployeeModel();
    // doctorId: number=0;
    // doctors!: DoctorModel;
    patientName: string = '';
    doctorName: string = '';
    appointmentDate: string="";
  }
