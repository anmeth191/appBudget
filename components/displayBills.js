import React , { useState , useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


/*This component display all the bills or payments in the database*/

function DisplayBills(){

    //set the State for the bills coming from the database
const [bills , setBills ] = useState([]);

   //get the current dates and check if the payment is overdue or not
const dateObject = new Date();
//get the day of the month
const currentDay = dateObject.getDate();

//get the current Month of the year
const currentMonth = dateObject.getMonth() + 1;

console.log(currentMonth);



//this function makes an http request to the server 
function getBills(){
    axios.get('http://127.0.0.1:8000/').then( response =>{
                                              setBills(response.data.body)}).catch( error =>{ console.log( error )})
}//end of the function getBills

//calls the function getBills once the component is rendered
useEffect(() => { getBills(); }, []);

//in the return we map the elements in bills array and display them to the user
return(
<div className="displayBill">
 {
     //map the bills array and display them to the user
  bills.map( element =>{ 
    //create a variable that calculates the current day and the payment and say if it is overdue or not
    let dayPaymentReminder = ( currentDay - element.day_payment);
    //if the number is negative we multiply it by -1 to turn it positive abd then display it in the component 
    (dayPaymentReminder <= 0 ) ? dayPaymentReminder = dayPaymentReminder * - 1 : dayPaymentReminder = dayPaymentReminder * 1; 
    
  //create a variable that calculates the month and verify if is overdue or not
    let monthPaymentReminder =  currentMonth - element.month_payment;
  //if the number is negative we multiply it by -1 to turn it positive abd then display it in the component 
    (monthPaymentReminder <= 0) ? monthPaymentReminder = monthPaymentReminder * -1 : monthPaymentReminder = monthPaymentReminder; 



    return(
      <div className="displayBill__container" key={element.id_bill}>
          <div className="displayBill__container__infoBill">
        <h2 className="displayBill__container__infoBill--billTitle">{element.bill_name}</h2>
        <span className="displayBill__container__infoBill--amount span">Amount: {element.payment_amount}</span>
        <span className="displayBill__container__infoBill--status span">Status: {element.status_payment}</span>
        
        <span className="displayBill__container__infoBill--dueDate span">{(element.frequency_payment === 'Monthly')?`This month on: ${element.day_payment}` : (element.frequency_payment === 'Weekly') ? `This week on: ${element.weekday_payment}` : (element.frequency_payment === 'Yearly') ? `This Year On: ${element.month_payment} / ${element.day_payment}` : 'no date specified '}</span>

        
        <span style={(element.frequency_payment === 'Monthly') ? {display:'block'} : {display:'none'}}>{(element.day_payment < currentDay && element.status_payment ==='Pending') ? `you are ${dayPaymentReminder} days over due`: (element.status_payment === 'Payed') ? `This bill has been payed` : `${dayPaymentReminder} remaining days`}</span>
        
        
        <span style={(element.frequency_payment === 'Yearly') ? {display:'block'} : {display:'none'}}>{(element.month_payment < currentMonth && element.status_payment ==='Pending') ? `you are ${monthPaymentReminder}  months and ${dayPaymentReminder } days over due`: `${monthPaymentReminder} month remaining`}</span>
        
        </div>
         
         <div className="displaBill__container__settingsLinks">
        <Link className="link" to={`modifybill/${element.id_bill}`}>Modify bill</Link>
        <Link className="link" to={`deletebill/${element.id_bill}`}>Delete bill</Link>
         </div>
          </div>
    )//end of the return
  })//end of the map
 }
    </div>
)//end of the return
}


export default DisplayBills;