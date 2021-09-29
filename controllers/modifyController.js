const { query } = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'1234',
    database:'budgetapp'
})



module.exports = (app)=>{

app.put('/modifybill' , (request , response )=>{ 

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


app.put('/' ,(request,response )=>{
    
    //get the data to update and also same time insert in the payment table for future references
    const id_bill = parseInt(request.query.id);
    const day_payment = request.body.day;
    const month_payment = request.body.month;
    const year_payment = request.body.year;  
    
    
    console.log(request.body)

    //create the update query for the bill
    connection.query(`UPDATE bill SET status_payment="Payed" WHERE id_bill=${id_bill}` , (error , results)=>{
      if(error) throw error;
       else{
    response.json({
        message:'Your bill has been payed'
    })//end of the response to client when the bill has been updated
    }//end of the else
    })//end of the query to update the bill

    //insert the bill and the date of payment for future data analisis 
    connection.query(`INSERT INTO payment (id_bill , day_payment , month_payment , year_payment) VALUES (${id_bill},${day_payment},${month_payment},${year_payment})`,(error, results)=>{
            if(error) throw error;
            else{
                console.log('data has been added to payment')
            }
    })


})
}//end of the module