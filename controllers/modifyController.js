const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'1234',
    database:'budgetapp'
})



module.exports = (app)=>{

app.post('/modifybill' , (request , response )=>{ 

    const { id } = request.body;
    const { billName } = request.body;
    const billPayment  = parseInt(request.body.billPayment);
    const { billStatus } = request.body;
    const { billFrequency } = request.body;
    const dayModify = parseInt(request.body.dayModify);
    const { weekDayModify } = request.body;
    const monthModify = parseInt(request.body.monthModify ) 

    
    connection.query(`UPDATE bill  SET bill_name='${billName}',
                                   payment_amount=${ billPayment },
                                    frequency_payment='${billFrequency}',
                                     status_payment='${billStatus}',
                                      day_payment=${dayModify},
                                      month_payment=${monthModify},
                                      weekday_payment='${weekDayModify}' WHERE id_bill = ${id}` , (error , result )=>{
                                          if(error) throw error;
                                          else {
                                              response.json({
                                                  message:'Your bill has been modified successfully '
                                              })//end of the response json
                                          }//end of the else
                                      })//end of the query

})//end of the modify bill controller
}//end of the module