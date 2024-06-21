import { Component } from '@angular/core';
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { matchValidator } from '../../form-validators';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'

})
export class SignupComponent {

  empSignupForm: FormGroup;
  empName:FormControl;
  email:FormControl;
  password:FormControl;
  confirmPwd:FormControl;
  designation:FormControl;
  roleAdmin:FormControl;

  constructor (private http:HttpClient,private toastr:ToastrService,private router:Router){

    this.empName= new FormControl("",[Validators.required,Validators.minLength(3)]);
    this.email= new FormControl("",[Validators.required,Validators.email]);
    this.password= new FormControl("", [
      Validators.required,
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6),
      Validators.maxLength(25),
      matchValidator('confirmPassword', true)
    ]);
    this.confirmPwd=new FormControl("",[
      Validators.required,
      matchValidator('password')
    ]);
    this.designation=new FormControl("",Validators.required);
    this.roleAdmin=new FormControl("",Validators.required);

    this.empSignupForm = new FormGroup({
      empName:this.empName,
      email:this.email,
      password:this.password,
      confirmPwd:this.confirmPwd,
      designation:this.designation,
      roleAdmin:this.roleAdmin


    });
  }
 getEmpName(){

  return this.empSignupForm.get("empName")?.value;
 }
 getEmail(){

  return this.empSignupForm.get("email")?.value;
 }
 getPassword(){

  return this.empSignupForm.get("password")?.value;
 }

 getConfirmPwd(){

  return this.empSignupForm.get("confirmPwd")?.value;
 }
 getDesignation(){

  return this.empSignupForm.get("designation")?.value;
 }
 getRoleAdmin(){

  return this.empSignupForm.get("roleAdmin")?.value;
 }

submitForm(){
const userName = this.getEmpName();
const email= this.getEmail();
const password= this.getPassword();
const designation = this.getDesignation();
let roleAdmin = this.getRoleAdmin();
if (roleAdmin === "true") roleAdmin =  1; else roleAdmin = 0;

console.log(userName);
console.log(email);
console.log(password);
console.log(designation);
console.log(roleAdmin);
const newEmployee={
  name:userName,
  email:email,
  password:password,
  designation:designation,
  roleAdmin:roleAdmin
}
this.http.post('http://localhost:3000/addEmployee',newEmployee)
    .subscribe((response:any)=>{
      console.log(response.message);
      this.toastr.success(response.message,"Message From SignUp Module");
      this.router.navigate(['/logIn']);


    },

    (error)=>{
      this.toastr.error("Employee with same email already registered","Message from Signup Module");
      this.toastr.error("error in adding the employee..try with a different email","Message from Signup Module");
      console.error('error in adding the employee',error);});



}

}

