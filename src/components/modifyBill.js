import React , {useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function ModifyBill(props){
     //receive the id and and covert it into int value
     const id = parseInt(props.match.params.id);
     const [billName , setBillName ] = useState('');
     const[billPayment , setBillPayment] = useState(0);
     const [billStatus , setBillStatus ] = useState('');
     const [billFrequency , setBillFrequency ] = useState('');
     const [dayModify , setDayModify ] = useState('');
     const [weekDayModify , setWeekModify ] = useState('Monday');
     const [monthModify , setMonthModify ] = useState('');
 

     //variables for display the days months and weekdays
     const daysNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
     const monthsNumbers = [1,2,3,4,5,6,7,8,9,10,11,12];
     const weekDays = [' Sunday ',' Monday ' , ' Tuesday ' , ' Wednesday ' , ' Thursday ' , ' Friday ' , ' Saturday '];

   

     useEffect(() => { 

        function getBillToModify(){
        axios.get(`http://127.0.0.1:8000/modifybill?id=${id}`).then( response =>{ 
            setBillName(response.data.body.bill_name);
            setBillPayment(response.data.body.payment_amount);
            setBillStatus(response.data.body.status_payment);
            setBillFrequency(response.data.body.frequency_payment);
            setDayModify(parseInt(response.data.body.day_payment));
            setMonthModify(response.data.body.month_payment);
            setWeekModify(response.data.body.weekday_payment);
        }).catch( error =>{ console.log(error)})
    }  
    
        getBillToModify();
    
    }, []);    



return(
    <div>
        <Link to='/'>Home</Link>
         <div>
             <div>
              <label htmlFor="bill_name">Bill name:  </label>   
             <input name="bill_name"  type="text" value={ billName } onChange={(event)=>{ setBillName(event.target.value)}}/>  
             </div>
             <div>
             <label htmlFor="bill_amount">Bill amount:  </label>    
             <input  name="bill_amount" type="number" value={ billPayment } onChange={(event)=>{ setBillPayment(event.target.value)}}/>  
             </div>

            <div>
            <label htmlFor="bill_payment">Due:  </label>
                <select name="bill_payment" value={ billFrequency } onChange={ (event )=>{ setBillFrequency(event.target.value)}}>
                <option value="Monthly">Monthly</option>
                <option valye="Yearly">Yearly</option>
                <option value="Weekly">Weekly</option>
                </select>
            </div>
            <div> 
            <label htmlFor="bill_status">Bill status:  </label>      
               <select value={ billStatus } onChange={(event)=>{ setBillStatus(event.target.value)}}>
                   <option value="Pending">Pending</option>
                   <option value="Payed">Payed</option>
               </select>  
             </div>
         </div> 
    
   

     <div style={ (billFrequency === 'Monthly' || billFrequency ==='Yearly')?{ display:"block"}:{display:"none"}}>
     <label htmlFor="day_payment">Day Payment: </label>   
     <select name="day_payment"  value={ dayModify } onChange={( event )=>{ setDayModify(event.target.value)}}>
     {daysNumbers.map( element =>{ return(<option key={ element }>{element}</option>)  })}
     </select>
     </div>

     <div style={ (billFrequency === 'Weekly')?{display:"block"}:{display:"none"}}>
     <label htmlFor="weekday_payment">Weekday Payment: </label>       
     
     <select name="weekday_payment"  value={20} onChange={(event)=>{ setWeekModify(event.target.value)}}>
     {weekDays.map( element =>{ return(<option key={ element }>{element}</option>)  })}
     </select>
     </div>

     <div style={ (billFrequency === 'Yearly' ) ? {display:"block"}:{display:"none"}}>
     <label htmlFor="month_payment">Month Payment: </label>           
     <select  name="month_payment" value={ monthModify } onChange={(event)=>{ setMonthModify(event.target.value)}   }>
     {monthsNumbers.map( (element,index) =>{ return(<option key={ index }>{element}</option>)  })}
     </select>
     </div>
     
     

    </div>
)//end of the return
}

export default ModifyBill;