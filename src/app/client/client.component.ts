import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

  clientForm: FormGroup;
  clientName:FormControl;
  email:FormControl;
  address1:FormControl;
  address2:FormControl;
  city:FormControl;
  state:FormControl;
  pinCode:FormControl;
  typeOfClient:FormControl;


  constructor (private http:HttpClient,private toastr:ToastrService,private router:Router){

    this.clientName= new FormControl("",[Validators.required,Validators.minLength(3)]);
    this.email= new FormControl("",[Validators.required,Validators.email]);
    this.address1= new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),

    ]);
    this.address2=new FormControl("",[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]);
    this.city=new FormControl("",Validators.required);
    this.state=new FormControl("",Validators.required);
    this.pinCode = new FormControl("",[Validators.required,Validators.minLength(6),
    Validators.maxLength(6)]);
    this.typeOfClient = new FormControl("",Validators.required);

    this.clientForm = new FormGroup({
      clientName:this.clientName,
      email:this.email,
      address1:this.address1,
      address2:this.address2,
      city:this.city,
      state:this.state,
      pinCode:this.pinCode,
      typeOfClient:this.typeOfClient


    });
  }
 getClientName(){

  return this.clientForm.get("clientName")?.value;
 }
 getEmail(){

  return this.clientForm.get("email")?.value;
 }
 getAddress1(){

  return this.clientForm.get("address1")?.value;
 }

 getAddress2(){

  return this.clientForm.get("address2")?.value;
 }
 getCity(){

  return this.clientForm.get("city")?.value;
 }
 getState(){

  return this.clientForm.get("state")?.value;
 }

 getPinCode(){

  return this.clientForm.get("pinCode")?.value;
 }
 getTypeOfClient(){

  return this.clientForm.get("typeOfClient")?.value;
 }


submitClientForm(){
const clientName = this.getClientName();
const email= this.getEmail();
const address1= this.getAddress1();
const address2 = this.getAddress2();
const city = this.getCity();
const state= this.getState();
const pinCode= this.getPinCode();
const typeOfClient = this.getTypeOfClient();
const newClient={
  name:clientName,
  email:email,
  address1:address1,
  address2:address2,
  city:city,
  state:state,
  pincode:pinCode,
  clientType:typeOfClient
}
this.http.post('http://localhost:3000/addClient',newClient)
    .subscribe((response:any)=>{
      console.log(response.message);
      this.toastr.success(response.message,"Message From Admin Module");
      this.router.navigate(['/admin']);


    },

    (error)=>{

      this.toastr.error("error in adding the Client..try again later","Message from Admin Module");
      console.error('error in adding the Client',error);});



}

}
