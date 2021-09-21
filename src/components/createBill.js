import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



function CreateBill(){
//this variable is going to display the days in the select htlm tag when the user selects an option

const [ bill , setBill ] = useState('');
const [payment , setPayment ] = useState(0); 
const daysNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const monthsNumbers = [1,2,3,4,5,6,7,8,9,10,11,12];
const weekDays = [' Sunday ',' Monday ' , ' Tuesday ' , ' Wednesday ' , ' Thursday ' , ' Friday ' , ' Saturday '];
const [frequency , setFrequency ] = useState('');
const [status , setStatus ] = useState('Pending');
const [day , setDay ] = useState('null');
const [month, setMonth ] = useState('null')
const [weekday , setWeekDay ] = useState('null');
const [message , setMessage ] = useState('');

function formSubmitted(event){
    event.preventDefault();
    createPostToServer();
}

function createPostToServer(){
//create the axios request to post the data to the server 
axios({
    method:'POST',
    url:'http://127.0.0.1:8000/createbills',
    headers:{"Content-Type":"application/json"},
    data:{ 
        bill,
        payment,
        frequency,
        status,
        day,
        month,
        weekday
    }
}).then( response =>{ setMessage(response.data.message) }).catch( error =>{ console.log(error) })


}
    return(
        <div>
            <Link to="/">Home</Link>

             <div>
              <h1>{message}</h1>
             </div>

            <div>
                <form onSubmit={ formSubmitted }>

                      <div>
                          <label htmlFor="bill" > New Bill name </label>
                          <input type="text" name="bill" value={ bill } onChange={(event)=>{ setBill(event.target.value)}}  required/>
                      </div>


                      <div>
                          <label htmlFor="amount"> Payment Amount </label>
                          <input type="text" name="amount" value={payment} onChange={(event)=>{ setPayment(event.target.value) }} required/>
                      </div>
 
                      
                        
                      <div>
                          <label htmlFor="frequency"> Payment Frequency </label>
                           <select name="frequency"  onChange={ (event)=>{ setFrequency(event.target.value); }}>
                               <option value="null">Select an option</option>
                               <option value="Monthly">Monthly</option>
                               <option value="Yearly">Yearly</option>
                               <option value="Weekly">Weekly</option>
                           </select>
                      </div>


                      <div style={ frequency === 'Monthly'?{ display:'block'}: frequency === 'Yearly' ? {display:'block'} : { display:' none '}}>
                          <label htmlFor="dueDay">Select due Day:</label>
                           <select value={ day } onChange={ (event)=>{ setDay(event.target.value)}}>
                               {
                               daysNumbers.map( element  =>{ return(<option value={ element } key={element}>{element}</option>)})
                               }
                        </select>
                     </div>
                    

                    <div style={ frequency === 'Weekly' ? {display:'block'}:{ display:'none'}}>
                        <label htmlFor="due_dayWeek"> Select a due day:</label>
                        <select  name="due_dayWeek"  value={ weekday } onChange={(event)=>{ setWeekDay(event.target.value)}}>
                            <option value="null">Select Day</option>
                            {
                            weekDays.map( element =>{ return( <option value={element } key={element}>{element}</option>)})
                            }  
                        </select>
                        </div>

                        <div style={ frequency === 'Yearly' ? {display:'block'}:{display:'none'}}>
                            <label htmlFor="month_dueDate">Select a Month</label>
                            <select name="month_dueDate" value={ month } onChange={ (event)=>{ setMonth(event.target.value)}}>
                            <option value="null">Select Month</option>
                               {
                                   monthsNumbers.map( element => {return( <option value={element} key={element}>{element} </option>)})
                               }
                            </select>
                            </div>


                              <div>
                                  <label htmlFor="status">Status:</label>
                                  <select value={ status } onChange={ (event)=>{ setStatus(event.target.value) }} required>
                                      <option value="Pending">Pending</option>
                                      <option value="Payed">Payed</option>
                                      </select>
                                  </div>
    
                               <div>
                                   <button type="submit">Create Bill</button>
                                   </div>
                    </form>
                </div>
            </div>
    )



}

export default CreateBill;