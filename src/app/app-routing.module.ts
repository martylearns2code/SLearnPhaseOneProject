import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { ClientComponent } from './client/client.component';
import { MeetingComponent } from './meeting/meeting.component';
import { UpdateMeetingComponent } from './update-meeting/update-meeting.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';
import { DeleteMeetingComponent } from './delete-meeting/delete-meeting.component';

const routes: Routes = [{'path':'',component:LoginComponent},
{'path':'logIn',component:LoginComponent},
{'path':'admin',component:AdminmenuComponent},
{'path':'logout',component:LoginComponent},
{'path':'signUp',component:SignupComponent},
{'path':'resetPwd',component:ResetPwdComponent},
{'path':'createClient',component:ClientComponent},
{'path':'scheduleMeet',component:MeetingComponent},
{'path':'editCancelMeet',component:UpdateMeetingComponent},
{'path':'editMeeting/:id',component:EditMeetingComponent},
{'path':'deleteMeeting/:id',component:DeleteMeetingComponent},];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
