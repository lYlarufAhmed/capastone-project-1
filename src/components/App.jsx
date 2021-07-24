import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Student from "./Student";
import React from "react";
import {store} from "../redux";
import {Provider} from 'react-redux'
import Home from "./Home";


export default function App() {

    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path={'/'} component={Home}/>
                    <Route path={'/s/:teacher_uid'} component={Student}/>
                </Switch>
            </Router>
        </Provider>
    )
}