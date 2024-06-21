                               #  AnnaClientMgmt--->  **Write up or Thought notes**

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.  

###   This is the assignment submission for the phase one of fullstack -caltech program. 

##### Backend of this project   

I have set up the backend using Nodejs-express and sql using the mysql database.the scripts used for the database set up are provided as an attachment in the project submissions.  

All the requests to the database are coded in the server.js file and it is required to go to the following directory and run the   
"node server.js" command to get the backend server running on localhost:3000 

SLearnPhase1Project\annaClientMgmt\src>   

In the server.js file i have set up the express,cors,body-parser and mysql modules to help execute the backend tasks.   

The values for the db connection used by me to set up the database are below:  

  host:'localhost',
  user:'root',
  password:'ILuv2code*2024',
  database:'annaClientMgmtDb',


  all the crud operations i.e create read update delete requests are set up from the server.js file and the code for all the requests to the database can be found here.

  ** please do not create any of the id fields in the tables i.e empId, clientId or meetingId as autoincrement fields as I have done that in code **   

  ##### The angular or front end part of the assignment   

  the home page is the login page and it asks the user to provide valid credentials to log in to the system.   
  besides the functionality of logging in for valid users the login page provides links to two more components and they  
  are the signup page or component and the forgot password or reset password component.  

  the signup component provides the interface for the employees of Anna to register thier details and redirects them to login page  
  after successful signup.only those employees of Anna who register them selves as admin can go forward to the admin pages.those employees who do not register themselves as "admin" on the sign up page will not be able to login in to the admin menu.

  duplicate email ids are not allowed while registering on the signup page and this is to make sure usernames are unique as the email id are used to login into the system

  also the password and confirm passwords must be same to be able to go ahead with the registration on the sign up page.  
  reactive forms are used to collect data on all the components and i made use of formgroups and formcontrols to achieve my goals.
  all the form inputs or controls  on all the forms are validated and the submit buttons are enabled only if the form inputs are valid.   

  the password forgot or reset password feature is not yet developed and the app says so.

  once valid users with admin rights login into the app they are provided with admin menu which allows them to create and add new clients,create and schedule new meetings and edit/delete a scheduled meeting.  

  ** it is required to add clients to the system before any meetings can be scheduled for them. **

  while scheduling a new meeting,the employees names and clients names in the database tables are picked up and are used to populate  
  the concerned select or dropdown elements so the admin can select these values accordingly while scheduling a new meet. 

  from the admin menu when the admin chooses to edit or cancel a meet the admin is directed to the update meeting component where he is asked to pick a client's name from a select or dropdown list and all the meetings for that client are retrieved from the db and displayed as a list of scheduled meetings(in a table) with the provision to edit or delete each of them.   

  if the admin wants to update a scheduled meeting he can only update the time of the meeting and nothing else.

  on successful registration of employee,addition of clients,scheduling of meetings,updation of meetings and deletion of meetings a message is displayed by the app to inform the user about the status of the successful creation of the same.   

  when ever there is an error or failure during any of thses operations  customized error messages are also diplsyed to the user.  

  toaster serrvice module and its popups are used to display all the above mentioned messages.

  screen shots of all the screens showing all the above are included in the submission.

  #####  Agile and Scrum usage in the completion of the assignment.

  jira is used to track the projects work and execution of the sprints are recorded in retrospect as this is a personal project and i am the only contributor to the work. 

  ##### BDD with Cucumber and end to end to testing of this project  

  all the work done is tested end to end using cucumber and the final report is submitted along in the submissions.  

  all the tests have passed successfully except the ones involving creation and updation of meetings.i had some issues while trying to pick date from datetime picker while using the selenium webdriver to create or update a meeting and that's why i was getting errors on some of the scenarios. both the reports are being submitted.

  ##### version control and github

  all the code is pushed to a remote repository on github and the name of the repository is given below:

  https://github.com/martylearns2code/SLearnPhaseOneProject   







 








