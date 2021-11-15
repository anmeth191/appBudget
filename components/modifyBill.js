import React , {useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function ModifyBill(props){
     //receive the id and and covert it into int value
     const id = parseInt(props.match.params.id);

     //create the State for the bill is going to modify 
     const [billName , setBillName ] = useState('');
     const[billPayment , setBillPayment] = useState(0);
     const [billStatus , setBillStatus ] = useState('');
     const [billFrequency , setBillFrequency ] = useState('');
     const [dayModify , setDayModify ] = useState('');
     const [weekDayModify , setWeekModify ] = useState('Monday');
     const [monthModify , setMonthModify ] = useState('');
     const [messageServer , setMessageServer ] = useState('');
     const [ billModified , setBillModified ] = useState(false);
 

     //variables for display the days months and weekdays
     const daysNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
     const monthsNumbers = [1,2,3,4,5,6,7,8,9,10,11,12];
     const weekDays = [' Sunday ',' Monday ' , ' Tuesday ' , ' Wednesday ' , ' Thursday ' , ' Friday ' , ' Saturday '];
   


     function formSubmit(event){
         event.preventDefault();

         axios({
             method:"PUT",
             url:'http://127.0.0.1:8000/modifybill',
             headers:{"Content-Type":"application/json"},
             data:{
                 id,
                 billName,
                 billPayment,
                 billStatus,
                 billFrequency,
                 dayModify,
                 weekDayModify,
                 monthModify
             }

         }).then( response => { 
             setMessageServer(response.data.message);
             setBillModified(response.data.modified);
            
            }).catch( error =>{ console.log(error)})

     }

     useEffect(() => { 
        /*This function creates a get request and then with the response set the values from the database into variables in the client */
        function getBillToModify(){
            /*create the get bill request passing as argument the id of the bill we would like to modify*/
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
    <div className="modifyBill"> 
       
        <div className="modifyBill__form containerForm">
            <div className="modifyBill__form__title">
                <h1 className="modifyBill__form__title-h1">Modify Bill</h1>
           </div>     

           <div className={ billModified ? "modifyBill__form__confirmMessage" : "displayNone"}>
           <h1 className="modifyBill__form__confirmMessage--message">{messageServer}</h1>
           </div>
        <form className="modifyBill__form__contentForm form" onSubmit={ formSubmit }>
      
             <div className="modifyBill__form__contentForm__section formSection">
            {/* Create the form form and assign in the values the data coming from the database , then setState with the event target and the onchange event*/}
             <input className="inputText" name="bill_name"  type="text" value={ billName } onChange={(event)=>{ setBillName(event.target.value)}}/>  
             <label  className="label" htmlFor="bill_name">Bill Name:</label>  
             </div>


             <div className="modifyBill__form__contentForm__section formSection"> 
             <input  className="inputText" name="bill_amount" type="number" value={ billPayment } onChange={(event)=>{ setBillPayment(event.target.value)}}/>  
             <label  className="label" htmlFor="bill_amount">Bill amount:</label>  
             </div>

             <div className="modifyBill__form__contentForm__section formSection">
                 <select id="bill_frequency" className="select" value={billFrequency} onChange={(event)=>{ setBillFrequency(event.target.value)}}>
                     <option value="Monthly">Monthly</option>
                     <option value="Yearly">Yearly</option>
                     <option value="Weekly">Weekly</option>
                 </select>
                <label  htmlFor="bill_frequency">Payment Frequency:</label>  
             </div>



     
      {/*in this case the style for this element will apply when the frequency is Monthly or Yearly, is the same for the other elements*/}
     <div className={ (billFrequency === 'Monthly' || billFrequency ==='Yearly')? "modifyBill__form__contentForm__section formSection": "displayNone"}>
     {/*In the select element assign the value of the state coming from the database and then change it to the event value */}
     <select  className="select" name="day_payment"  value={ dayModify } onChange={( event )=>{ 
         setDayModify(event.target.value);
         setWeekModify('No day');
         setMonthModify(0)
    }}>
     {/*Display the data in the array using a map to render in the option the elements of the array*/}
     {daysNumbers.map( element =>{ return(<option key={ element }>{element}</option>)  })}
     </select>
     <label  htmlFor="day_payment">Day Payment: </label>   
     </div>

      {/*in this case the style for this element will apply when the frequency is weekly, is the same for the other elements*/}
     <div className={(billFrequency === 'Weekly')?"modifyBill__form__contentForm__section formSection":"displayNone"}>
     <select className="select" name="weekday_payment"  value={weekDayModify} onChange={(event)=>{ 
         setWeekModify(event.target.value);
         setMonthModify(0);
         setDayModify(0);
         }}>
    {/*Display the data in the array using a map to render in the option the elements of the array*/}
     {weekDays.map( element =>{ return(<option value={element} key={ element }>{element}</option>)  })}
     </select>
     <label  htmlFor="weekday_payment">Weekday Payment: </label>       

     </div>


      {/*in this case the style for this element will apply when the frequency is Yearly, is the same for the other elements*/}
     <div className={ (billFrequency === 'Yearly' ) ? "modifyBill__form__contentForm__section formSection":"displayNone"}>
     <select className="select" name="month_payment" value={ monthModify } onChange={(event)=>{ 
         setMonthModify(event.target.value);
         setWeekModify('No day');
         }}>
      {/*Display the data in the array using a map to render in the option the elements of the array*/}
     {monthsNumbers.map( (element,index) =>{ return(<option key={ index }>{element}</option>)  })}
     </select>
     <label  htmlFor="month_payment">Month Payment: </label>           
     </div>
     

     <div className="modifyBill__form__contentForm__section formSection">
                 <select id="bill_status" className="select" value={billStatus} onChange={(event)=>{ setBillStatus(event.target.value)}}>
                     <option value="Pending">Pending</option>
                     <option value="Payed">Payed</option>
                 </select>
                 <label htmlFor="bill_status">Bill Status:</label>  
             </div>

 
    <div className="modifyBill__form__contentForm__section formSection">
        <button className="button" type="submit">Modify Bill</button>
        </div>  
    </form>
    </div>
    </div>
)//end of the return

}

export default ModifyBill;