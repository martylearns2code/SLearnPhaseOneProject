import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';
import { MeetingComponent } from './meeting/meeting.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';
import { DeleteMeetingComponent } from './delete-meeting/delete-meeting.component';
import { UpdateMeetingComponent } from './update-meeting/update-meeting.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { ClientComponent } from './client/client.component';
import {ToastrModule}from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminmenuComponent,
    MeetingComponent,
    EditMeetingComponent,
    DeleteMeetingComponent,
    UpdateMeetingComponent,
    ResetPwdComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot({}),
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ],
  providers: [provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


