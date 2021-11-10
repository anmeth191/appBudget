const bodyParser = require('body-parser');
const e = require('express');

const mysql = require('mysql');
const connection = mysql.createConnection({
     host:'127.0.0.1',
     user:'root',
     password:'1234',
     database:'budgetapp'
})


module.exports = (app)=>{

//this controller creates a new bill in the database 
app.post('/createbills' , (request , response) =>{
//create variables for the elements coming from the client

     const bill = request.body.bill;
     const payment = request.body.payment;
     const frequency = request.body.frequency;
     const status = request.body.status;
     const day = request.body.day;
     const month = request.body.month;
     const weekday = request.body.weekday;

//this query selects the bill_name and then looks if it already exist
connection.query('SELECT bill_name FROM bill' , (error , result )=>{
        //convert the result array with all the bills coming from the database to JSON format
      const resultJson = JSON.parse(JSON.stringify(result));
       
      //find the bill that matches the bill sent by the client 
      const checkBillExist = resultJson.find( element =>{ 
           return element.bill_name === bill
      })

      //if the bill is undefined means it does not exist, so we can insert the bill
    if(checkBillExist === undefined){

     connection.query(`INSERT INTO bill (bill_name , payment_amount, frequency_payment, status_payment, day_payment, month_payment, weekday_payment , date_creation)
                   VALUES ("${bill}" , ${payment}, "${frequency}", "${status}", "${day}", "${month}", "${weekday}" , NOW())` , (error , results)=>{
                         if (error) throw error;
                         else{
                              response.json({
                              message:'Your bill has been created',
                              modified:true
                              })
                         }//end of the else
                   });//end of the insert into bill query

    } else { //else send a message to the client that the bill already exist in the database
        response.json({
             message:'This bill already exist in the database'
        })
    }//end of the if when the value is undefined which means is not in the database

})
//insert the values into the database
});//end of the post for create a new bill


app.post('/registerclients' , (request , response ) =>{

 const { name } = request.body;
 const { lastName } = request.body;
 const { email } = request.body; 
const { password } = request.body; 
let emailQuery = '';

//create a query counting if the email is already in th db then the email
connection.query(`SELECT count(email) AS verifyEmail FROM user WHERE email = '${email}'`,(error, results)=>{

if(error) throw error;
else{
     emailQuery = JSON.parse(JSON.stringify(results[0]));

     if(emailQuery.verifyEmail < 1){

     connection.query(`INSERT INTO user(userName, lastName, password , email ) VALUES ('${name}' , '${lastName}','${password}' , '${email}')` , ( error , result )=>{
               if(error) throw error;
                 else{
                    response.json({
                       message:`user ${name} has been saved into the db`
                      })
                    }//end of the else
                  });//end of the query to the database
          
     }else{
        response.json({
             message:'this user is already in the database'
          });
     }//end of the else
}//end of the else
})//end of the query
})//end of the post to save the users
}//emd of the module exports