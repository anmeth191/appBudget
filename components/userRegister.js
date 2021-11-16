import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function RegisterClient(){

    const [username , setUsername ] =  useState('');
    const [userLastname , setUserlastname] = useState('');
    const [userEmail , setUseremail ] = useState('');
    const [userPassword , setUserpassword ] = useState('');
    const [repeatPassword , setRepeatpassword ] = useState('');
    const [messageResponse , setMessageResponse ] = useState('');

    const [labelName , setLabelName ] = useState('First name: ');
    const [labelLastname , setLabelLastname ] = useState('Last name: ');
    const [labelPassword , setLabelpassword] = useState('New password: ');

  
  
  
    const patternLetters = /^[a-zA-Z\s]*$/;
    const patternPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

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
            setMessageResponse(response.data.message);
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
    setMessageResponse('Passwords Entered do not Match');
    

} else {
registerUser();
}//end of the else
}//end of the submit form

return(
    <div className="register">

<div className="register__container  containerForm">

<div className="register__container__message">
<h1  className="register__container__message--title">Create a new account</h1>
<span className="register__container__messageResponse">{messageResponse}</span>
</div>

<form  className=" register__container__form form" onSubmit={  submitForm }>
    <div className="register__container__form__section formSection"> 
    <input className="inputText" type="text" name="userName" value={ username } onChange={ 
        (event)=>{
            //setUsername(event.target.value);
            let results = patternLetters.test(event.target.value);
            if(results === true){
             setUsername(event.target.value);
             setLabelName('First name: ')
            }else{
              setLabelName('Only letters please');
            }
        }//end of the function
    }//end of the Onchange Event      
        />
    <label className="label" htmlFor="userName">{labelName}</label>
    </div>
    
    <div className="register__container__form__section formSection">
    <input  className="inputText" type="text" name="userLastname" value={ userLastname } onChange={ (event)=>{  
            let results = patternLetters.test(event.target.value);

            if(results === true){
                setUserlastname(event.target.value);
                setLabelLastname('Last name: ')
            }else{
               setLabelLastname('Only letters');
            }


        }//end of the function
        }//end of the  
        />
    <label className="label" htmlFor="userLastname">{labelLastname}</label>
    </div>
    
    <div className=" register__container__form__section formSection">
    <input  className="inputText" type="email" name="userEmail" value={ userEmail } onChange={ (event) =>{ setUseremail(event.target.value)}}/>
    <label className="label" htmlFor="userEmail">Email</label> 
    </div>

    <div className=" register__container__form__section formSection">
    <input className="inputText" type="password" name="userPassword" value={ userPassword }  onChange={(event)=>{ 
        
        let results = patternPassword.test(event.target.value);

        if(results === true){
            setUserpassword(event.target.value);
            setLabelpassword('New password: ');
        }else{
             setLabelpassword('Min 8 letters, at least a symbol, upper and lower case letters and a number');
        }//end of the else

        }//end of the function
        }//end of the onChange
        />
    <label className="label" htmlFor="userPassword">{labelPassword}</label>
    </div>

    <div className=" register__container__form__section formSection">
    <input className="inputText" type="password" name="repeatPassword" value={ repeatPassword }  onChange={(event)=>{setRepeatpassword(event.target.value)}}/>
    <label className="label" htmlFor="userPassword">Repeat password:</label>
    </div>

<div className="register__container__form__section__submit formSection">
<button className="register__container__form__section__submit--button button" type="submit">Sign Up</button>
<Link className="register__container__form__section__submit--link" to="/loginclients">Already have an account?</Link>

</div>
</form>

</div>
</div>
)//end of the return
}//end of register client

export default RegisterClient;



