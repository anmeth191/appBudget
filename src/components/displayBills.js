import React , { useState , useEffect } from 'react';
import axios from 'axios';


/*This component display all the bills or payments in the database*/

function DisplayBills(){

    //set the State for the bills coming from the database
const [bills , setBills ] = useState([]);

//this function makes an http request to the server 
function getBills(){
    axios.get('http://127.0.0.1:8000/').then( response =>{ setBills([response.data.body])}).catch( error =>{ console.log( error )})
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
          <h1>{element.bill_name}</h1>
          <h1>{element.payment_amount}</h1>
          <h1>{element.frequency_payment}</h1>
          </div>
    )//end of the return
  })//end of the map
 }
    </div>
)//end of the return
}


export default DisplayBills;