import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { FormControl,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent implements OnInit {
 clientsByName : {Id:any,clientByName:string}[]=[];
 employeesByName : {employeeByName:string}[]=[];
 meetingForm: FormGroup;
  clientName:FormControl;
  meetType:FormControl;
  topic:FormControl;
  meetWithEmp:FormControl;
  participantsNum:FormControl;
  meetingTime:FormControl;




 constructor(private http:HttpClient,private toastr:ToastrService,private router:Router){

  this.clientName= new FormControl("",[Validators.required,Validators.minLength(3)]);
    this.meetType= new FormControl("",[Validators.required]);
    this.topic= new FormControl("", [
      Validators.required]);
    this.meetWithEmp=new FormControl("",[
      Validators.required
    ]);
    this.participantsNum=new FormControl("",Validators.required);
    this.meetingTime=new FormControl("",Validators.required);


    this.meetingForm = new FormGroup({
      clientName:this.clientName,
      meetType:this.meetType,
      topic:this.topic,
      meetWithEmp:this.meetWithEmp,
      participantsNum:this.participantsNum,
      meetingTime:this.meetingTime,


    });

 }

ngOnInit(): void {
    this.http.get('http://localhost:3000/ClientsByName')
    .subscribe((response:any)=>{
      this.clientsByName=response;
      console.log(this.clientsByName);
    },
    (error)=>{

      this.toastr.error("error in fetching the Clients..try again later","Message from Admin Module");
      console.error('error in fetching the Clients',error);});

      this.http.get('http://localhost:3000/employeesByName')
    .subscribe((response:any)=>{
      this.employeesByName=response;
      console.log(this.employeesByName);
    },
    (error)=>{

      this.toastr.error("error in fetching the employees..try again later","Message from Admin Module");
      console.error('error in fetching the employees',error);});

}

getClientName(){

  return this.meetingForm.get("clientName")?.value;
 }
 getMeetType(){

  return this.meetingForm.get("meetType")?.value;
 }
 getTopic(){

  return this.meetingForm.get("topic")?.value;
 }

 getMeetWithEmp(){

  return this.meetingForm.get("meetWithEmp")?.value;
 }
 getParticipantsNum(){

  return this.meetingForm.get("participantsNum")?.value;
 }
 getMeetingTime(){

  return this.meetingForm.get("meetingTime")?.value;
 }

 submitMeetingForm(){
  const clientName = this.getClientName();
  const meetType= this.getMeetType();
  const topic= this.getTopic();
  const meetWithEmp = this.getMeetWithEmp();
  const participantsNum = this.getParticipantsNum();
  const meetingTime= this.getMeetingTime();
  const newMeeting={
    clientName:clientName,
    meetWith:meetWithEmp,
    typeOfMeeting:meetType,
    meetingTopic:topic,
    noOfParticipants:participantsNum,
    startTime:meetingTime,

  }
  this.http.post('http://localhost:3000/addMeeting',newMeeting)
      .subscribe((response:any)=>{
        console.log(response.message);
        this.toastr.success(response.message,"Message From Admin Module");
        this.router.navigate(['/admin']);


      },

      (error)=>{

        this.toastr.error("error in adding the Meeting..try again later","Message from Admin Module");
        console.error('error in adding the Meeting',error);});



  }




}
