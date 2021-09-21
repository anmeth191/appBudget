import React from 'react';


function DeleteBill(props){
     //receive the id and and covert it into int value
    const id = parseInt(props.match.params.id);
    
return(
    <div>
        Hello from Delete bill with id { id }
    </div>
)
}

export default DeleteBill;