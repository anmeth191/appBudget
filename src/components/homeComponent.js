import React from 'react';
import { Link } from 'react-router-dom';
import DisplayBills from './displayBills';

function HomeComponent(){

    return(
        <div>
            <Link to="/createbills">Create a Bill</Link>
            <DisplayBills />
            </div>
    )


}

export default HomeComponent;