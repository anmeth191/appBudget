import React , {useState , useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'



function DetailBill(props){

    


    const { id } = props.match.params;
    const [billName , setBillName ] = useState('');
    const [billAmount , setBillAmount ] = useState(0);
    const [billFrequency , setBillFrequency ] = useState('')
    const [billStatus , setBillStatus ] = useState('');




    function getBillDetail(){

        axios.get(`http://127.0.0.1:8000/detailbills?id=${parseInt(id)}`).then( response =>{
         setBillName(response.data.body.bill_name);
         setBillAmount(response.data.body.payment_amount);
         setBillFrequency(response.data.body.frequency_payment);
         setBillStatus(response.data.body.status_payment);
       }).catch(error =>{ console.log(error)})

}


useEffect(() => {
   getBillDetail();
}, []);

return(
    <div className="detailBill">
        <div className="detailBill__container">
       <table className="detailBill__container__table">
        <tr className="detailBill__container__table--row">
            <th className="detailBill__container__table--head"><h1>Bill Name</h1></th>
            <th className="detailBill__container__table--head"><h1>Bill Amount</h1></th>
            <th className="detailBill__container__table--head"><h1>Bill Frequency</h1></th>
            <th className="detailBill__container__table--head"><h1>Bill Status</h1></th>
        </tr>
        <tr className="detailBill__container__table--row">
        <td className="detailBill__container__table--data"><span className="span">{billName}</span></td>
        <td className="detailBill__container__table--data"><span className="span">{billAmount}</span></td>
        <td className="detailBill__container__table--data"><span className="span">{billFrequency}</span></td>
        <td className="detailBill__container__table--data"><span className="span">{billStatus}</span></td>
        
        </tr>
        </table>

        <div className="detailBill__container__buttons">
        <Link to={`/modifybill/${id}`}  className="button link">Modify Bill</Link>
        <button className="button">Delete Bill</button>
        </div>
        </div>
        </div>
)

}


export default DetailBill;