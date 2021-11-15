import React, { useState } from 'react';
import axios from 'axios';



function LoginUser(){

const [ userEmail , setUseremail ] = useState('');
const [userPassword , setUserpassword ] = useState(''); 
const [messageResponse , setMessageResponse ] = useState('');


function requestLogin(){

    axios({
        method:"POST",
        url:"http://127.0.0.1:8000/loginclients",
        headers:{"Content-Type":"application/json"},
        data:{
            user: userEmail,
            password: userPassword
        }//end of the data
    }).then( response =>{ 
        setMessageResponse(response.data.message)
    }).catch( error =>{ console.log(error)})//end of the axios
}//end of the requestLogin



function submitLogin(event){
  event.preventDefault();
   requestLogin();
}

return(
    <div className="login">
    
       <div className="login__form containerForm">
     
       <div className="login__form__messages">
       <h1 className="login__form__messages--title">Log in to my Hive </h1>
       <span className="login__form__messages--messageResponse">{ messageResponse }</span>
       </div>

       <form className="login__form__contentForm form" onSubmit={ submitLogin  }>
           <div className="login__form__contentForm__section formSection">
               <input className="inputText" type="email" id="emailUser" value={ userEmail } onChange={( event ) =>{
                   setUseremail(event.target.value);
               }}/>
                  <label className="label" htmlFor="emailUser">Email</label>
            </div>

            <div className="login__form__contentForm__section formSection">
               <input className="inputText" type="password" id="passwordUser" value={ userPassword } onChange={( event ) =>{
                   setUserpassword(event.target.value);
               }}/>
               <label className="label" htmlFor="passwordUser">Password</label>
               
            </div>

            <div     className="login__form__contentForm__section__button">
             <button className="login__form__contentForm__section__button--centerButton button" type="submit">login</button>
            </div>
           </form>
           </div>
    </div>
)//end of the return 
}//end of the function

export default LoginUser;