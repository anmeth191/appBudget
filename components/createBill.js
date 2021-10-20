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
const [day , setDay ] = useState(0);
const [month, setMonth ] = useState(0)
const [weekday , setWeekDay ] = useState('Sunday');
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
        <div className="createBill">
           
             <div className="createBill__message">
              <h1 className="createBill__message--content">{message}</h1>
             </div>

            <div className="createBill__form">
            <div className="createBill__form__title">
                <h1 className="createBill__form__title-h1">Create new Bill</h1>
           </div>     
                <form className="createBill__form__contentForm" onSubmit={ formSubmitted }>

                      <div className="createBill__form__contentForm__section">
                          <input className="inputText" type="text" name="bill" value={ bill } onChange={(event)=>{ setBill(event.target.value)}}  required/>
                          <label className="label" htmlFor="bill" > New Bill name </label>
                      </div>


                      <div className="createBill__form__contentForm__section">
                          <input className="inputText"  type="number" name="amount" value={payment} onChange={(event)=>{ setPayment(event.target.value) }} required/>
                          <label className="label" htmlFor="amount"> Payment Amount </label>
                      </div>
 
                      <div className="createBill__form__contentForm__section">
                           <select className="select" name="frequency"  onChange={ (event)=>{ setFrequency(event.target.value); }}>
                               <option className="select__option" value="null">Select an option</option>
                               <option className="select__option" value="Monthly">Monthly</option>
                               <option className="select__option" value="Yearly">Yearly</option>
                               <option className="select__option" value="Weekly">Weekly</option>
                           </select>
                          <label htmlFor="frequency"> Payment Frequency </label>
                      </div>


                      <div  className={ frequency ==='Monthly'? "createBill__form__contentForm__section": frequency === 'Yearly' ? "createBill__form__contentForm__section" : "displayNone" }>
                           <select className="select" value={ day } onChange={ (event)=>{ setDay(event.target.value)}}>
                               {
                               daysNumbers.map( element  =>{ return(<option value={ element } key={element}>{element}</option>)})
                               }
                        </select>
                        <label htmlFor="dueDay label">Select due Day:</label>
                     </div>
                    

                    <div className={ frequency === 'Weekly' ? "createBill__form__contentForm__section" : "displayNone"}>
                        <select  className="select" name="due_dayWeek"  value={ weekday } onChange={(event)=>{ setWeekDay(event.target.value)}}>
                            <option value="null">Select Day</option>
                            {
                            weekDays.map( element =>{ return( <option value={element } key={element}>{element}</option>)})
                            }  
                        </select>
                        <label htmlFor="due_dayWeek label"> Select a due day:</label>
                        </div>

                        <div className={ frequency === 'Yearly' ? "createBill__form__contentForm__section" : "displayNone"}>
                            <select className="select" name="month_dueDate" value={ month } onChange={ (event)=>{ setMonth(event.target.value)}}>
                            <option value="null">Select Month</option>
                               {
                                   monthsNumbers.map( element => {return( <option value={element} key={element}>{element} </option>)})
                               }
                            </select>
                            <label htmlFor="month_dueDate label">Select a Month</label>
                            </div>


                              <div className="createBill__form__contentForm__section">
                                  <select className="select" value={ status } onChange={ (event)=>{ setStatus(event.target.value) }} required>
                                      <option value="Pending">Pending</option>
                                    
                                      </select>
                                      <label htmlFor="status label">Status:</label>
                                  </div>
    
                               <div className="createBill__form__contentForm__section">
                                   <button className="button" type="submit">Create Bill</button>
                                   </div>
                    </form>
                </div>
            </div>
    )



}

export default CreateBill;