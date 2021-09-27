import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateBill from './components/createBill';
import HomeComponent from './components/homeComponent';
import ModifyBill from './components/modifyBill';
import DeleteBill from './components/deleteBill';
import Navbar from './components/Navbar';
import DisplayBills from './components/displayBills';


function App(){
    return(
        <div>
            <Router>
            <Navbar />
                <Switch>
                <Route exact path="/" component={ HomeComponent } />
                <Route path="/bills" component={ DisplayBills }/>
                <Route path="/createbills" component={ CreateBill }/>
                 <Route path="/modifybill/:id" component={ ModifyBill } />   
                 <Route path="/deletebill/:id" component={ DeleteBill } />   
                    </Switch>
                </Router>
        </div>
    )


}

export default App;