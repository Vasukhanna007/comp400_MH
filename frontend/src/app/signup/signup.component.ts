import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Form} from "@angular/forms"
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,private api: ApiService ){

  }
  ngOnInit(): void{
    this.signupForm = this.formBuilder.group({
      name:[''],
      dob:[''],
      gender:[''],
      email:[''],
      phone:[''],
      language:[''],
      password:[''],
      medicalHistory:[]
    })
  }
  // console.log(this.signupForm.value);
  signUp(){
    this.api.postPatient(this.signupForm.value).subscribe(res =>{
      alert("Signup Successfull");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("something went wrong")
    })
  }
}
