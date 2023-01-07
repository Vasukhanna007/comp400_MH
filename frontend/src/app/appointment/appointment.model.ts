import { EmployeeModel } from '../employee-dashboard/employee-dashboard.model';

export class AppointmentModel{
    appointmentId: number =0;
    patient: EmployeeModel=new EmployeeModel();
    doctorId: number=0;
    name: string = '';
    email: string='';
    date: string="";
  }
