import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormControl,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrl: './edit-meeting.component.css'
})
export class EditMeetingComponent  implements OnInit{
  meetingUpdateForm: FormGroup;
  clientName:FormControl;
  meetingType:FormControl;
  meetingTopic:FormControl;
  meetingWith:FormControl;
  participantsNum:FormControl;
  meetingTime:FormControl;
  updatedMeetingTime:FormControl;
  meetingId:any;

  constructor(private http:HttpClient,private toastr:ToastrService,private router:Router,private route:ActivatedRoute){

      this.clientName= new FormControl({value:"",disabled:true});
      this.meetingType= new FormControl({value:"",disabled:true});
      this.meetingTopic= new FormControl({value:"",disabled:true});
      this.meetingWith=new FormControl({value:"",disabled:true});
      this.participantsNum=new FormControl({value:"",disabled:true});
      this.meetingTime=new FormControl({value:"",disabled:true});
      this.updatedMeetingTime=new FormControl("",Validators.required);



      this.meetingUpdateForm = new FormGroup({
        clientName:this.clientName,
        meetingType:this.meetingType,
        meetingTopic:this.meetingTopic,
        meetingWith:this.meetingWith,
        participantsNum:this.participantsNum,
        meetingTime:this.meetingTime,
        updatedMeetingTime:this.updatedMeetingTime,

      });

   }


  ngOnInit(): void {

      this.route.paramMap.subscribe(params=>{
      const idParam=params.get('id');

      if(idParam!==null){
        console.log(idParam);
        this.http.get('http://localhost:3000/getMeeting/'+idParam )
    .subscribe((response:any)=>{
      this.clientName=response[0].client;
      this.meetingType=response[0].type_of_meeting;
      this.meetingTopic=response[0].meeting_topic;
      this.meetingWith=response[0].meeting_with;
      this.participantsNum=response[0].participants;
      this.meetingTime=response[0].starting_at;
      this.meetingId=idParam;
      console.log(response);
    },
    (error)=>{

      this.toastr.error("error in fetching the meeting details..try again later","Message from Admin Module");
      console.error('error in fetching the meeting details',error);});
      }
      else{
        console.error("id is missing or null");
      }


    })


  }
   getUpdatedMeetingTime(){

    return this.meetingUpdateForm.get("updatedMeetingTime")?.value;
   }

  submitMeetingUpdateForm(){

  const meetingId=this.meetingId;
  const updatedMeetingTime= this.getUpdatedMeetingTime();
  const updateMeeting={
    meetingId:meetingId,
    updatedTime:updatedMeetingTime,

  }
  this.http.put('http://localhost:3000/updateMeeting',updateMeeting)
      .subscribe((response:any)=>{
        console.log(response.message);
        this.toastr.success(response.message,"Message From Admin Module");
        this.router.navigate(['/editCancelMeet']);


      },

      (error)=>{

        this.toastr.error("error in updating the Meeting..try again later","Message from Admin Module");
        console.error('error in updating the Meeting',error);});



  }


  }


