//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

//define the express operation
const app = express();
const port= 3000;

//define the cors-cross origin for recieving the data in json format
app.use(cors());
app.use(bodyParser.json());

//establish the connection with the db

const db=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'ILuv2code*2024',
  database:'annaClientMgmtDb',

});




//verify whether the db is connected or not

db.connect(err=>{
  if(err){
  console.error('Connection is not established with the db' +  err);
  }
else{
  console.log("connected to db");
}
})



app.listen(port,()=>{console.log('server started on port 3000')} );



//api endpoints
//to get details of all the meetings

app.get('/getMeetings',(req,res)=>{
  const sql='SELECT meetings.meetingId as meeting_id, client.name AS client,employee.name AS meeting_with,meetings.meetingType as type_of_meeting,meetings.meetingTopic as meeting_topic,meetings.noOfparticipants as participants,meetings.startTime as starting_at FROM  client INNER JOIN meetings  ON client.clientId = meetings.clientId INNER JOIN employee ON meetings.meetEmployeeId = employee.empId ORDER BY meetings.meetingId;'
  db.query(sql,(err,result)=>{
if(err){
  console.error('Error in fetching the meetings',err);
  res.status(500).json({error:'An error occured '});
}
else{
res.status(200).json(result);
}
});
});


//to add an employee in to the employee table

app.post('/addEmployee',async(req,res)=>{
  const {name,email,password,designation,roleAdmin}=req.body;

  const query ='SELECT empId from employee where email=?';
  queryPromise = () =>{
    return new Promise((resolve, reject)=>{
     db.query(query,[email], (error, results)=>{
             if(error){
                  return reject(error);
                   }
                   return resolve(results);
               });
           });
         };


  const query1='SELECT MAX(empId) as max_count FROM employee';

  var empId;
  queryPromise1 = () =>{
   return new Promise((resolve, reject)=>{
    db.query(query1, (error, results)=>{
            if(error){
                 return reject(error);
                  }
                  return resolve(results);
              });
          });
        };

 const query2='insert into employee values(?,?,?,?,?,?)';
  queryPromise2 = () =>{
     return new Promise((resolve, reject)=>{
      db.query(query2,[empId,name,email,password,designation,roleAdmin], (error, results)=>{
    if(error){
     return reject(error);
         }
   return resolve(results);
    });
   });
  };

 try{
   const result= await queryPromise();

   if (result.length != 0){

     res.status(400).json({message:"Employee with the given email already registered.try a new email"})
      }else{
      const result1 = await queryPromise1();
      if (result1 == null){
        empId = 0;
     }else {
       empId= result1[0].max_count + 1 ;
     }
   const result2=await queryPromise2();
    res.status(200).json({message:'Employee details added successfully'});

  }

  } catch(error){
     console.log(error)
      }
  });




  //to add a client in to the client table

app.post('/addClient',async(req,res)=>{
  const {name,email,clientType,address1,address2,city,state,pincode}=req.body;
  const query1='SELECT MAX(clientId) as max_count FROM client';
  var clientId;
  queryPromise1 = () =>{
  return new Promise((resolve, reject)=>{
      db.query(query1, (error, results)=>{
          if(error){
              return reject(error);
          }
          return resolve(results);
      });
  });
};

const query2='insert into client values(?,?,?,?,?,?,?,?,?)';
queryPromise2 = () =>{
  return new Promise((resolve, reject)=>{
      db.query(query2,[clientId,name,email,clientType,address1,address2,city,state,pincode], (error, results)=>{
          if(error){
              return reject(error);
          }
          return resolve(results);
      });
  });
};

try{
  const result1 = await queryPromise1();
  if (result1 == null){
    clientId = 0;
  }else {
    clientId= result1[0].max_count + 1 ;
  }
    const result2=await queryPromise2();
    res.status(200).json({message:'Client details added successfully'});
  } catch(error){
      console.log(error)
        }
  });


 //to add a meeting to the meetings table

 app.post('/addMeeting', async(req,res)=>{
  const {clientName,meetWith,typeOfMeeting,meetingTopic,noOfParticipants,startTime}=req.body;
  var meetingId,clientId,empId;
  const query1='SELECT clientId FROM client WHERE name= ?';
  queryPromise1 = () =>{
    return new Promise((resolve, reject)=>{
        db.query(query1,[clientName], (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};
const query2='SELECT empId FROM employee WHERE name= ?';
queryPromise2 = () =>{
  return new Promise((resolve, reject)=>{
      db.query(query2,[meetWith], (error, results)=>{
          if(error){
              return reject(error);
          }
          return resolve(results);
      });
  });
};
const query3='SELECT MAX(meetingId) as max_count FROM meetings';
queryPromise3 = () =>{
  return new Promise((resolve, reject)=>{
      db.query(query3, (error, results)=>{
          if(error){
              return reject(error);
          }
          return resolve(results);
      });
  });
};

const query4='insert into meetings values(?,?,?,?,?,?,?)';
queryPromise4 = () =>{
  return new Promise((resolve, reject)=>{
      db.query(query4,[meetingId,clientId,empId,typeOfMeeting,meetingTopic,noOfParticipants,startTime], (error, results)=>{
          if(error){
              return reject(error);
          }
          return resolve(results);
      });
  });
};

try{
    const result1 = await queryPromise1();
    const result2 = await queryPromise2();
    const result3 = await queryPromise3();
    clientId = result1[0].clientId;
    empId=result2[0].empId;
    if (result3 == null){
      meetingId = 0;
    }else {
      meetingId= result3[0].max_count + 1 ;
    }
    const result4 = await queryPromise4();
    res.status(200).json({message:'meeting scheduled successfully'});

  } catch(error){
     console.log(error)
  }

  });



//to get the details of a meeting given the id of the meeting

app.get('/getMeeting/:id',(req,res)=>{
  const id=req.params.id;
  const sql='SELECT meetings.meetingId as meeting_id, client.name AS client,employee.name AS meeting_with,meetings.meetingType as type_of_meeting,meetings.meetingTopic as meeting_topic,meetings.noOfparticipants as participants,meetings.startTime as starting_at FROM  client INNER JOIN meetings  ON client.clientId = meetings.clientId INNER JOIN employee ON meetings.meetEmployeeId = employee.empId where meetings.meetingId=?;'
  db.query(sql,[id],(err,result)=>{
  if(err){
      console.error('Error in getting the details of the meeting',err);
      res.status(500).json({error:'An error occured '});
  }
  else{
      res.status(200).json(result);
  }
  });
  });


//get the password of the employee by email-id if valid email address

app.get('/login/:email',(req,res)=>{
  const email=req.params.email;
  const sql='SELECT password,roleAdmin as admin from employee where email=?';
  db.query(sql,[email],(err,result)=>{
  if(err){
      console.error('Invalid email.check email entered',err);
      res.status(500).json({error:'Invalid Email provided.check email again'});
  }
  else{
      res.status(200).json(result);
  }
  });
  });



  //to update a meeting details

app.put('/updateMeeting',(req,res)=>{
  const {meetingId,updatedTime}=req.body;
  const sql='update meetings set startTime = ? where meetingId=?';
  db.query(sql,[updatedTime,meetingId],(err,result)=>{
  if(err){
      console.error('Error in rescheduling the meeting.meeting not rescheduled',err);
      res.status(500).json({error:'An error occured.try again later '});
  }
  else{
      res.status(200).json({message:'Meeting rescheduled successfully'});
  }
  });
  });



  // to delete a meeting given the meeting id

app.delete('/cancelMeeting/:id',(req,res)=>{
  const meetingId=req.params.id;
  const sql='delete from meetings where meetingId=?';
  db.query(sql,[meetingId],(err,result)=>{
  if(err){
      console.error('Error in cancelling the meeting',err);
      res.status(500).json({error:'An error occured.try again later'});
  }
  else{
      res.status(200).json({message:'Meeting Cancelled successfully'});
  }
  });
  });

  //get a list of clients by thier name

  app.get('/clientsByName',(req,res)=>{
    const sql='SELECT clientId as Id, name as clientByName from client';
    db.query(sql,(err,result)=>{
    if(err){
        console.error('No Clients Found',err);
        res.status(500).json({error:'No Clients Found.Add clients first to fetch them'});
    }
    else{
        res.status(200).json(result);
    }
    });
    });

    //get a list of employees by thier name

  app.get('/employeesByName',(req,res)=>{
    const sql='SELECT name as employeeByName from employee';
    db.query(sql,(err,result)=>{
    if(err){
        console.error('No Employees Found',err);
        res.status(500).json({error:'No Employees Found.Add employees first to fetch them'});
    }
    else{
        res.status(200).json(result);
    }
    });
    });

    //get meeting details given a clients id

    app.get('/getClientMeetings/:id',(req,res)=>{
      const id=req.params.id;
      const sql='SELECT meetings.meetingId as meeting_id, client.name AS client,employee.name AS meeting_with,meetings.meetingType as type_of_meeting,meetings.meetingTopic as meeting_topic,meetings.startTime as starting_at FROM  client INNER JOIN meetings  ON client.clientId = meetings.clientId INNER JOIN employee ON meetings.meetEmployeeId = employee.empId where meetings.clientId=?;'
      db.query(sql,[id],(err,result)=>{
      if(err){
          console.error('Error in getting the details of the meeting',err);
          res.status(500).json({error:'An error occured '});
      }
      else{
          res.status(200).json(result);
      }
      });
      });





