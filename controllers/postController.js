const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//this method allow us to encrypt a password




const mysql = require('mysql');
const connection = mysql.createConnection({
     host:'127.0.0.1',
     user:'root',
     password:'1234',
     database:'budgetapp'
})


module.exports = (app)=>{

     app.use(cors({
          origin:['http://localhost:3000/loginclients'],
          methods:["GET" , "POST"],
          credentials:false
     }))
     app.use(cookieParser());
     app.use(bodyParser.urlencoded({extended:true}))

     //initialize the session
     app.use(session({
          //key is the name of session in this case is mySession
          key:"mySession",
          //secret is like the access to my session
          secret:"secret",

          resave:false,
          saveUninitialized:false,
          //cookie is the one that controls the cookie and you set the time by setting  60 seconds *  60 minutes * hours 
          cookie:{
               cookieExpire: 60 * 60 * 24
          }
     }))

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
             message:'this user is already Exist'
          });
     }//end of the else
}//end of the else
})//end of the query
})//end of the post to save the users

//create the post component whe the users log in
app.post('/loginclients' , (request , response) =>{
 

     //get the data from the client side when submits the post
     const { user } = request.body;
     const { password } = request.body;
      let messageUsers = '';
     let userResults = '';

       request.session.mySession = user;
       console.log(request.session.mySession)


//    let myPromise  = new Promise( ( reject , resolve ) => {

//      //create the query to check if the user exist already
//  connection.query(`SELECT id_user ,password , COUNT(email) AS emailVerify FROM user WHERE email = '${user}' GROUP BY id_user`, 
//    (error , results )=>{
   
// //if the results cominf grom the database are undefined then send an message to the user that it does not exist
//   if( results[0] === undefined){
//        messageUsers =  'This user does not exist';
//        //else extraxct the data and convert it to jSON format
//   }else{
//      userResults = JSON.parse(JSON.stringify(results[0]));
//   }
//          //check if the email is equal to 1 which means is true or 0 is false
//         if(userResults.emailVerify >= 1 ){
//         //do the validations
//            if(userResults.password === password ){
//               messageUsers = `welcome to the page ${user}`;
//            }else{
//                 messageUsers = "That's not the right password";
//            }//end of the nested else
//        }else{
//          messageUsers = 'Cannot find user';
//        }

// response.json({
// message: messageUsers
// })
// })//end of the query ti select the clients 
//})//end of the promise
})//end of the app post login clients
}//emd of the module exports