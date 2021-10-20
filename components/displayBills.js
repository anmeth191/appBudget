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

//get the current Year 
const currentYear = dateObject.getFullYear();

//declare the payments reminders
let dayPaymentReminder = null;
let monthPaymentReminder = null;



//this function makes an http request to the server 
function getBills(){
    axios.get('http://127.0.0.1:8000/').then( response =>{
                                              setBills(response.data.body)}).catch( error =>{ console.log( error )})
}//end of the function getBills

//function is called when user clock the button pay the bill and updates the bill and the payment 
function payBill(bill_id){

axios({
  method:"PUT",
  url:`http://127.0.0.1:8000/?id=${bill_id}`,
  //axios was giving me an error about allow cors was blocking my request i added this line of code in my request for CORS and it works normally now 
  headers: {"Access-Control-Allow-Origin": "*"},
  data:{
    day: currentDay,
    month: currentMonth,
    year: currentYear
  }
}).then( response =>{ console.log(response)}).catch( error =>{ console.log(error)})

}


//calls the function getBills once the component is rendered
useEffect(() => { getBills(); }, []);

//in the return we map the elements in bills array and display them to the user
return(

<div className="displayBill">
<div className="displayBill__buttonCreate">
 <Link className="displayBill__buttonCreate--link" to="/createbills"> + </Link>
 </div>
 {
     //map the bills array and display them to the user
  bills.map( element =>{ 
    //create a variable that calculates the current day and the payment and say if it is overdue or not
    let dayPaymentCalculator = ( currentDay - element.day_payment);
    //if the number is negative we multiply it by -1 to turn it positive abd then display it in the component 
    (dayPaymentCalculator <= 0 ) ? dayPaymentReminder = dayPaymentCalculator * - 1 : dayPaymentReminder = dayPaymentCalculator * 1; 
    
  //create a variable that calculates the month and verify if is overdue or not
    let monthPaymentCalculator =  currentMonth - element.month_payment;
  //if the number is negative we multiply it by -1 to turn it positive abd then display it in the component 
    (monthPaymentCalculator <= 0) ? monthPaymentReminder = monthPaymentCalculator * -1 : monthPaymentReminder = monthPaymentCalculator; 



    return(
      <div className={(element.status_payment === "Payed") ? "noDisplay" : "displayBill__container" } key={element.id_bill}>
          
        <div className="displayBill__container__infoBill">
        <h1 className="displayBill__container__infoBill--billTitle">{element.bill_name}</h1>
        <h1 className="displayBill__container__infoBill--amount span">$  {element.payment_amount}</h1>
        <span className="displayBill__container__infoBill--status span"> {element.status_payment}</span>         
        {/* this button calls the function paybills and submit the payment and adjust the status of the bill*/}
        <button className="button" onClick={ ()=>{ /*payBill(element.id_bill);*/} }>Pay bill </button>
        </div>
         
         <div className="displayBill__container__settingsLinks">
         <Link className="link" to={`detailbills/${element.id_bill}`}>View Details</Link>
         </div>
         
         </div>
    )//end of the return
  })//end of the map
 }
    </div>
)//end of the return
}


export default DisplayBills;