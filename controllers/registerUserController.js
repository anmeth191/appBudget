const cors = require('cors');
const mysql = require('mysql');


const connection = mysql.createConnection({
    host:'localhost',
    database:'budgetapp',
    user:'root',
    password:'1234'
})


module.exports = (app)=>{


    app.use(cors({
     origin: 'http://localhost:3000',
     credentials:true
    }))


 app.get('/registerclients' , (request , response)=>{
   response.send('<h1>Hello from register clients</h1>')
 })   

app.post('/registerclients', (request , response , next )=>{

const { name , lastName , email , password } = request.body;
const verifyUserDB = `SELECT * FROM user WHERE email = '${email}'`;
let userCheck = '';

connection.query( verifyUserDB , (error , results)=>{
    if(error) throw error;
    else{
       
        if(results.length === 1){  
        userCheck = 'This email address is already in use'
        }else{

            userCheck = 'i am going to save this new user man'

        }//end of the inner else   

        response.json({
            message: userCheck
        })
    }//end of the else global
})

// connection.end();


})





}//end of the module exports