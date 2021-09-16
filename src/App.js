import React from 'react';
import axios from 'axios';
import { useEffect , useState } from 'react';

function App (){
    //variables that hold my data in my form
    const [name , setName ] = useState('');
    const [lastName , setLastName ] = useState('');
    const [ age , setAge ] = useState(null);
    const submitInfo = new FormData();
   
function submitForm (e){
    e.preventDefault();
  
    console.log(submitInfo);
   axios({ 
       method:'POST',
       url:'http://127.0.0.1:8000/',
       headers:{"Content-Type":"application/json"},
       data:{ 
           username: name,
           user_lastName: lastName,
           user_age: age
       }
   })

}    

function createRequest (){
 axios.get('http://127.0.0.1:8000/').then( response =>{ console.log(response.data.body)}).catch( error =>{ console.log( error ) })
}

useEffect(() => {  createRequest() }, []);
    return(
        <div>
        <form onSubmit={ submitForm  }>
        
        <div>    
        <label htmlFor="name">Username</label>
        <input type="text" name="name" onChange={(event)=>{setName(event.target.value)}} value={ name } />
        </div>

        <div>
        <label htmlFor="lastName">Lastname</label>
        <input  tytpe="text" name="lastName" onChange={(event)=>{ setLastName(event.target.value)}}/>
        </div>
        
        <div>
        <label htmlFor="age"> Select your age</label>
       
        <select name="age" onChange={ (event )=>{ setAge(event.target.value)}}>
            <option value="25"> 25 </option>
            <option value="26"> 26 </option>
            <option value="27"> 27 </option>
            <option value="28"> 28 </option>
            <option value="29"> 29 </option>
            <option value="30"> 30 </option>
        </select>  
        </div>
  <button type="submit">submit</button>
        </form>
        </div>
    )
}

export default App;