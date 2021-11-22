
const { query } = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'1234',
    database:'budgetapp'
})//end of the created connection



module.exports = (app)=>{

/*This controller is the home controller and it receives a request from the client for all the bills in the database */   
app.get('/' , (request , response) =>{
    //create the query to check all the bills in the database
  connection.query('SELECT  id_bill, bill_name , payment_amount, frequency_payment, status_payment, day_payment, month_payment, weekday_payment FROM bill ' , (error , results )=>{
       if(error) throw error;
       else{
           //send the results from the database in json format
       response.json({
           message:'Your request has been completed',
           //convert the data from the database to json format 
           body: JSON.parse(JSON.stringify(results))
      })
     }//end of the else
   })//end of the query
  })//end of the get 




app.get('/modifybill', (request , response )=>{ 

  const billModify = parseInt(request.query.id);
connection.query(`SELECT * FROM bill WHERE id_bill = "${ billModify }"` , (error , result )=>{

  if( error ) throw error;
  else{
    response.json({
     message:'your request has been completed',
     body: JSON.parse(JSON.stringify(result[0]))
    })

  }//end of the else
})//end of the connection
})//end of the get


app.get('/detailbills' , (request , response) =>{


  const id = parseInt(request.query.id)
  connection.query(`SELECT *  FROM bill WHERE id_bill = ${id}` , (error , results)=>{

    if(error) throw error;
    else{

      response.json({ 
        message:"your request has been completed",
        body: JSON.parse(JSON.stringify(results[0]))
      })//end of the else
    }//end of the callback function for the error 
  })//end of the query
})//end of the get request



app.get('/loginclients' , (request , response, next) =>{

  request.header('Access-Control-Allow-Origin' , '*');

  response.json({
    message:"hello from the login clients get request"
  })
  
  })




}//end of the module


