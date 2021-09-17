import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateBill from './components/createBill';
import HomeComponent from './components/homeComponent';

function App(){
    return(
        <div>
            <Router>
                <Switch>
                <Route exact path="/" component={ HomeComponent } />
                <Route path="/createbills" component={ CreateBill }/>
                    </Switch>
                </Router>
        </div>
    )


}

export default App;