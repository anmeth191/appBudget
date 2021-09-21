import React from 'react';


function ModifyBill(props){
     //receive the id and and covert it into int value
    const id = parseInt(props.match.params.id);
    
return(
    <div>
        Hello from modify bill with id { id }
    </div>
)
}

export default ModifyBill;