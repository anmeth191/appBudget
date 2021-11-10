import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function RegisterClient(){

    const [username , setUsername ] =  useState('');
    const [userLastname , setUserlastname] = useState('');
    const [userEmail , setUseremail ] = useState('');
    const [userPassword , setUserpassword ] = useState('');
    const [repeatPassword , setRepeatpassword ] = useState('');


function registerUser(){

    axios({
        method:'POST',
        url:'http://127.0.0.1:8000/registerclients',
        headers:{ 
            "Content-Type":"application/json"
        },
        data:{
            name:username,
            lastName:userLastname,
            email:userEmail,
            password:userPassword
        }//end of the data
        }).then( response =>{ 
            console.log(response.data.message)
        }).catch( error =>{ console.log(error)})//end of the axios



cleanTextFields();
}    

function cleanTextFields(){

    setUsername('');
    setUserlastname('');
    setUseremail('');
    setUserpassword('');
    setRepeatpassword('');
}

function submitForm(event){
event.preventDefault();    

if(userPassword !== repeatPassword ){
    console.log('passwords the do not match');
} else {
registerUser();
}//end of the else
}//end of the submit form

return(
    <div>
<h1>Hello from register the client</h1>
<form  onSubmit={  submitForm }>
    <div>
    <label htmlFor="userName">User name:</label>
    <input type="text" name="userName" value={ username } onChange={ (event)=>{setUsername(event.target.value)}}  />
    </div>
    
    <div>
    <label htmlFor="userLastname">Lastname</label>
    <input type="text" name="userLastname" value={ userLastname } onChange={ (event)=>{  setUserlastname(event.target.value)}} />
    </div>
    
    <div>
    <label htmlFor="userEmail">Email</label> 
    <input type="email" name="userEmail" value={ userEmail } onChange={ (event) =>{ setUseremail(event.target.value)}}/>
    </div>

    <div>
    <label htmlFor="userPassword">type password:</label>
    <input type="password" name="userPassword" value={ userPassword }  onChange={(event)=>{setUserpassword(event.target.value)}}/>
    </div>

    <div>
    <label htmlFor="userPassword">Repeat password:</label>
    <input type="password" name="repeatPassword" value={ repeatPassword }  onChange={(event)=>{setRepeatpassword(event.target.value)}}/>
    </div>

<button type="submit">Submit</button>
</form>

<Link to="/loginclients">Are you an existing user?</Link>

</div>
)//end of the return
}//end of register client

export default RegisterClient;



