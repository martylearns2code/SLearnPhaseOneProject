import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private http:HttpClient, private router:Router,private toastr:ToastrService) { }


  chkLogin(data:any){
    this.http.get('http://localhost:3000/login/'+data.value.userName)
    .subscribe((response:any)=>{
      if (response.length == 0 || data.value.password != response[0].password){

        console.log("invalid credentials");
        this.toastr.error("Invalid Credentials.Please try again","Message From Login Module");
      }else if (response[0].admin){

        this.router.navigate(['/admin'])
      }
      else{

        this.toastr.error("Only Admins Can Go Further","Message From Login Module");
      }
      },
    (error)=>{console.error('error in fetching the details',error);});
  }




}
