import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Student from './components/Student';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path={'/'} component={App}/>
            <Route path={'/s/:teacher_uid'} component={Student}/>
        </Switch>
    </Router>
    ,
    document.getElementById('root')
);
