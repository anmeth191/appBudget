import React , { useState } from 'react';
import { Link } from 'react-router-dom';



function CreateBill(){
//this variable is going to display the days in the select htlm tag when the user selects an option
const daysNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const monthsNumbers = [1,2,3,4,5,6,7,8,9,10,11,12];
const weekDays = [' Sunday ',' Monday ' , ' Tuesday ' , ' Wednesday ' , ' Thursday ' , ' Friday ' , ' Saturday '];
const [frequency , setFrequency ] = useState('');
const [status , setStatus ] = useState('Pending');
const [day , setDay ] = useState('null');
const [month, setMonth ] = useState('null')
const [weekday , setWeekDay ] = useState('null');

function formSubmitted(event){
    event.preventDefault();
    console.log('frequency:' + frequency);
    console.log('status:' + status);
    console.log('day:'+ day);
    console.log('month:'+month);
    console.log('weekday:'+weekday);
}
    return(
        <div>
            <Link to="/">Home</Link>

            <div>
                <form onSubmit={ formSubmitted }>

                      <div>
                          <label htmlFor="bill"> New Bill name </label>
                          <input type="text" name="bill"/>
                      </div>


                      <div>
                          <label htmlFor="amount"> Payment Amount </label>
                          <input type="text" name="amount"/>
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
                                  <select value={ status } onChange={ (event)=>{ setStatus(event.target.value) }}>
                                      <option value="pending">Pending</option>
                                      <option value="payed">Payed</option>
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