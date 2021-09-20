const bodyParser = require('body-parser');

const mysql = require('mysql');
const connection = mysql.createConnection({
     host:'127.0.0.1',
     user:'root',
     password:'1234',
     database:'budgetapp'
})


module.exports = (app)=>{
app.post('/createbills' , (request , response) =>{
     console.log(request);
     response.send('you have posted in the server');
});
}