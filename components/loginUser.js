import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//withCredentials,The XMLHttpRequest. withCredentials property is a boolean value that indicates whether
// or not cross-site Access-Control requests should be made using credentials such as cookies, 
//authorization headers or TLS client certificates.
axios.defaults.withCredentials = true;

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


function CheckSession(){
axios.get('http://127.0.0.1:8000/loginclients').then((response) =>{
    console.log(response.data)
}).catch( error =>{ console.log( error )})
}


function submitLogin(event){
  event.preventDefault();
   requestLogin();
}


useEffect(()=>{
    CheckSession();
} , [])
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
               }} required/>
                  <label className="label" htmlFor="emailUser">Email</label>
            </div>

            <div className="login__form__contentForm__section formSection">
               <input className="inputText" type="password" id="passwordUser" value={ userPassword } onChange={( event ) =>{
                   setUserpassword(event.target.value);
               }} required/>
               <label className="label" htmlFor="passwordUser">Password</label>
               
            </div>

            <div     className="login__form__contentForm__section__button">
             <button className="login__form__contentForm__section__button--centerButton button" type="submit">login</button>
            </div>
           </form>

        <div className="login__form__messages">
       <span className="login__form__messages__bottomText">New to this app?  
       <Link className="login__form__messages__bottomText--link" to="/registerclients">Sign Up </Link></span>
       </div>
           </div>
    </div>
)//end of the return 
}//end of the function

export default LoginUser;