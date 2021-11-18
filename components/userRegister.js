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

    const [labelName , setLabelName ] = useState('First name:');
    const [labelLastname , setLabelLastname ] = useState('Last name:');
    const [labelEmail , setLabelEmail ] = useState('Email:')
    const [labelPassword , setLabelpassword] = useState('New password: ');
    const [labelRepeatpassword , setLabelRepeatpassword ] = useState('Repeat password:')
  
  
     //these variables are the patterns for check if only text and the password pattern
     //at least one lower case an upper a numer and also a special char
    const patternLetters = /^[a-zA-Z\s]*$/;
    const patternPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

function formValidation(){  
    let verifyPassword = patternPassword.test(userPassword);

   if(username.length <= 0 ){
       setLabelName('Field is required');
   }if(userLastname.length <= 0){
        setLabelLastname('Field is required')
   }if(userEmail.length <= 0 ){
       setLabelEmail('Field is required')
   }if(verifyPassword){
    setLabelpassword('New password:')
   }if(!verifyPassword){
    setLabelpassword('Minimun 8 characters, an uppercase, a lowercase and a special character');
   }if(repeatPassword.length <= 0 ){
      setLabelRepeatpassword('Field is required');
   }if(repeatPassword !== userPassword){
   setLabelRepeatpassword('Password repeated do not match')
   }

   const createUserPromise = new Promise((resolve , reject )=>{
   
    if(userPassword === repeatPassword && userPassword.length > 0 && verifyPassword && username.length > 0 && userLastname.length > 0){
        resolve('hello')
    }else{
       reject('no hay naa')
    }
   })


   createUserPromise.then( response =>{ 
       console.log(response)
   }).catch( error =>{ console.log(error)})

    // //we validate the input for the name when the button is clicked and send an warning to user if something is wrong
    // let validateName = patternLetters.test(username);
    // validateName ? setLabelName('First name:'):setLabelName('Only Letters')
    
    //     //we validate the input for the last name when the button is clicked and send an warning to user if something is wrong
    //   let validationLastName = patternLetters.test(userLastname);
    //   validationLastName ? setLabelLastname('Last name:') : setLabelLastname('Only letters')

    //  let validatePassword = patternPassword.test(userPassword);
    //  validatePassword ? setLabelpassword('New password:') : setLabelpassword('Minimun 8 characters, an uppercase, number and a special character required')
           
    // const createUserPromise = new Promise((resolve , reject )=>{
 
    //     if(validatePassword  && validateName && validationLastName && userPassword === repeatPassword  ){
    //         resolve('the promise has resolved')
    //     }else{
    //         reject('the promise has rejected')
    //     }
    // })
     

    // createUserPromise.then( response =>{ 
    //     console.log(response)
    // }).catch( error =>{ console.log( error )})

    
    }//end of the form validation   


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

formValidation();

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
            //this variable check the pattern in real time when the user is not entering only letters
            let internalValidation = patternLetters.test(event.target.value);
             
            //check if the validation does not match then change the label content 
             if(internalValidation === true){ setLabelName('First name:');  
              //set the value of the field 
             setUsername(event.target.value); }
             else{
                  setLabelName('Only letters'); 
                };//end of the else       
            }//end of the function
    }//end of the Onchange Event      
        />
    <label className={(labelName === 'First name:') ? 'label': 'warningLabel'} htmlFor="userName">{labelName}</label>
    </div>
    
    <div className="register__container__form__section formSection">
    <input  className="inputText" type="text" name="userLastname" value={ userLastname } onChange={ (event)=>{  
        //this variable check the pattern in real time when the user is not entering only letters
            let internalValidation = patternLetters.test(event.target.value);     
        //check if the validation does not match then change the label content 
             if( internalValidation ){ 
                 setLabelLastname('Last name:');
                 setUserlastname(event.target.value); 
                } else {
                    setLabelLastname('Only letters');
                  };
            }//end of the function
        }//end of the  
        />
    <label className={(labelLastname === 'Last name:') ? 'label': 'warningLabel'} htmlFor="userLastname">{labelLastname}</label>
    </div>
    
    <div className=" register__container__form__section formSection">
    <input  className="inputText" type="email" name="userEmail" value={ userEmail } onChange={ (event) =>{
         setUseremail(event.target.value)
         setLabelEmail('Email:')
         }}/>
    
    <label className="label" htmlFor="userEmail">{labelEmail}</label> 
    </div>

    <div className=" register__container__form__section formSection">
    <input className="inputText" type="password" name="userPassword" value={ userPassword }  onChange={(event)=>{ 
         setUserpassword(event.target.value);
        }//end of the function
        }//end of the onChange
        />
    <label className="label" htmlFor="userPassword">{ labelPassword }</label>
    </div>

    <div className=" register__container__form__section formSection">
    <input className="inputText" type="password" name="repeatPassword" value={ repeatPassword }  onChange={(event)=>{
        setRepeatpassword(event.target.value)
        setLabelRepeatpassword('Repeat password:');
    }//end of the inner function    
        }/>
    <label className="label" htmlFor="userPassword">{labelRepeatpassword}</label>
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



