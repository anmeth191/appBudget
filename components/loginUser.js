import React, { useState } from 'react';
import axios from 'axios';



function LoginUser(){

const [ userEmail , setUseremail ] = useState('');
const [userPassword , setUserpassword ] = useState(''); 


function requestLogin(){

    axios({
        method:"POST",
        url:"http://127.0.0.1:8000/loginclients",
        headers:{"Content-Type":"application/json"},
        data:{
            user: userEmail,
            password: userPassword
        }//end of the data
    })//end of the axios
}//end of the requestLogin



function submitLogin(event){
  event.preventDefault();
   requestLogin();
}

return(
    <div>
       <h1> Hello from  the login component </h1>
       <form onSubmit={ submitLogin  }>
           
           <div>
               <label htmlFor="emailUser">user email</label>
               <input type="email" id="emailUser" value={ userEmail } onChange={( event ) =>{
                   setUseremail(event.target.value);
               }}/>
            </div>

            <div>
               <label htmlFor="passwordUser">user password</label>
               <input type="password" id="passwordUser" value={ userPassword } onChange={( event ) =>{
                   setUserpassword(event.target.value);
               }}/>
            </div>

             <button type="submit">login</button>
          
          
           </form>
    </div>
)//end of the return 
}//end of the function

export default LoginUser;