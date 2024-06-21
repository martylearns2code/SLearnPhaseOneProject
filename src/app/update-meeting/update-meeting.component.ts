import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-meeting',
  templateUrl: './update-meeting.component.html',
  styleUrl: './update-meeting.component.css'
})
export class UpdateMeetingComponent implements OnInit{

  clientsByName : {Id:any, clientByName:string}[]=[];
  getMeetingsOf : any = "";
  clientsMeetings : {meeting_id:any, client:string,meeting_with:string,type_of_meeting:string,meeting_topic:string,starting_at:any}[]=[];

  constructor(private http:HttpClient,private toastr:ToastrService,private router:Router){



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
      }


getMeetings(){
  this.http.get('http://localhost:3000/getClientMeetings/'+ this.getMeetingsOf)
      .subscribe((response:any)=>{
        if(response.length == 0){
          this.clientsMeetings=[];
          this.toastr.info("No meetings scheduled for the Client selected","Message From The Admin Module");

        }else{
          this.clientsMeetings=response;

        }


      },
      (error)=>{

        this.toastr.error("error in fetching the Client's meetings..try again later","Message from Admin Module");
        console.error("error in fetching the Client's meetings",error);});


}

}
