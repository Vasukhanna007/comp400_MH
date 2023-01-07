import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { DoctorComponent } from './doctor/doctor.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},//make login work
  {path:'signup', component:SignupComponent}, 
  {path: 'dashboard', component: EmployeeDashboardComponent},// doctor should see this, should add similar functionality for edit patient(one can only edit oneself) to patient dashboard
  {path:'appointment-list', component: AppointmentListComponent},//doctor should see
  {path:'home', component: HomeComponent},//appointment booking page both should be able to access
  {path:'doctor',component: DoctorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
