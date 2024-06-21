import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormControl,FormGroup } from '@angular/forms';


@Component({
  selector: 'app-delete-meeting',
  templateUrl: './delete-meeting.component.html',
  styleUrl: './delete-meeting.component.css'
})
export class DeleteMeetingComponent implements OnInit {
  meetingDeleteForm: FormGroup;
  clientName:FormControl;
  meetingType:FormControl;
  meetingTopic:FormControl;
  meetingWith:FormControl;
  participantsNum:FormControl;
  meetingTime:FormControl;
  meetingId:any;

  constructor(private http:HttpClient,private toastr:ToastrService,private router:Router,private route:ActivatedRoute){

    this.clientName= new FormControl({value:"",disabled:true});
    this.meetingType= new FormControl({value:"",disabled:true});
    this.meetingTopic= new FormControl({value:"",disabled:true});
    this.meetingWith=new FormControl({value:"",disabled:true});
    this.participantsNum=new FormControl({value:"",disabled:true});
    this.meetingTime=new FormControl({value:"",disabled:true});




    this.meetingDeleteForm = new FormGroup({
      clientName:this.clientName,
      meetingType:this.meetingType,
      meetingTopic:this.meetingTopic,
      meetingWith:this.meetingWith,
      participantsNum:this.participantsNum,
      meetingTime:this.meetingTime,

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

submitMeetingDeleteForm(){

  const meetingId=this.meetingId;


  this.http.delete('http://localhost:3000/cancelMeeting/'+ meetingId)
      .subscribe((response:any)=>{
        console.log(response.message);
        this.toastr.success(response.message,"Message From Admin Module");
        this.router.navigate(['/editCancelMeet']);


      },

      (error)=>{

        this.toastr.error("error in deleting the Meeting..try again later","Message from Admin Module");
        console.error('error in deleting the Meeting',error);});



  }
}
