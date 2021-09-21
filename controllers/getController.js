
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
  connection.query('SELECT * FROM bill' , (error , results )=>{
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
}//end of the module