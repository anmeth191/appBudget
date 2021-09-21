import React , { useState , useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


/*This component display all the bills or payments in the database*/

function DisplayBills(){

    //set the State for the bills coming from the database
const [bills , setBills ] = useState([]);

//this function makes an http request to the server 
function getBills(){
    axios.get('http://127.0.0.1:8000/').then( response =>{
                                              setBills(response.data.body)}).catch( error =>{ console.log( error )})
}//end of the function getBills

//calls the function getBills once the component is rendered
useEffect(() => { getBills(); }, []);

//in the return we map the elements in bills array and display them to the user
return(
<div>
 {
     //map the bills array and display them to the user
  bills.map( element =>{ 
    return(
      <div key={element.id_bill}>
          <ul>
          <h5>{element.bill_name}</h5>
          <li><span>{element.payment_amount}</span></li>
          <li><span>{element.frequency_payment}</span></li>
          <li><span>{element.status_payment}</span></li>
          <li><span>{(element.frequency_payment === 'Monthly')?`${element.day_payment}` : (element.frequency_payment === 'Weekly') ? `${element.weekday_payment}` : (element.frequency_payment === 'Yearly') ? `${element.month_payment} / ${element.day_payment}` : 'no date specified '}</span></li>
          </ul>
        <Link to={`modifybill/${element.id_bill}`}>Modify bill</Link>
        <br />
        <Link to={`deletebill/${element.id_bill}`}>Delete bill</Link>
          </div>
    )//end of the return
  })//end of the map
 }
    </div>
)//end of the return
}


export default DisplayBills;