import React , {useState , useEffect } from 'react';
import axios from 'axios';



function DetailBill(props){

    const { id } = props.match.params;



    function getBillDetail(){

        axios.get(`http://127.0.0.1:8000/detailbills?id=${parseInt(id)}`).then( response =>{
         console.log(response.data.body)
       }).catch(error =>{ console.log(error)})
}


useEffect(() => {
   getBillDetail();
}, []);

return(
    <div>
      Hello from detail bill component
        </div>
)

}


export default DetailBill;