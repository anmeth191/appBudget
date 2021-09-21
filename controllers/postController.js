const bodyParser = require('body-parser');

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

     connection.query(`INSERT INTO bill (bill_name , payment_amount, frequency_payment, status_payment, day_payment, month_payment, weekday_payment)
                   VALUES ("${bill}" , ${payment}, "${frequency}", "${status}", "${day}", "${month}", "${weekday}")` , (error , results)=>{
                         if (error) throw error;
                         else{
                              response.json({
                              message:'Your bill has been created'
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


}//emd of the module exports