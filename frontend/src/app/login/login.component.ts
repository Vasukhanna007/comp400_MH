import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  // public isDoctor: boolean=false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,private api: ApiService){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:[''],
      isDoctor:false
    })
  }

  login(loginForm: any){
    const data={"email":loginForm.value.email,"password":loginForm.value.password,"isDoctor": loginForm.value.isDoctor}
    console.log(data.isDoctor)
    this.api.auth(data).subscribe(res=>{
      console.log("res",res);
      //not working??

      if(res){
        alert("Login Success");
         this.loginForm.reset();
         if(data.isDoctor){
          console.log(data.email);

            this.api.email = data.email;

          this.router.navigate(['appointment-list']);
        }
        else{
          this.api.email = data.email;

          this.router.navigate(['appointment-list']);
        }

      }
      else{
        console.log("wrong email or password");
        this.loginForm.reset();

      }
    },
    err=>{
      console.log("error")
    })
    // console.log("hello");
    // this.http.get<any>("http://localhost:3000/signupUsers")
    // .subscribe(res=>{
    //   const user = res.find((a:any)=>{
    //     // console.log("hello");
    //     return a.email === loginForm.value.email && a.password === loginForm.value.password
    //   });
    //   if(user){
    //     alert("Login Success");
    //     this.loginForm.reset();
    //     this.router.navigate(['dashboard'])
    //   }
    //   else{
    //     alert("user not found");
    //   }
    // },err=>{
    //   alert("something went wrong")

    // })

  }

}


