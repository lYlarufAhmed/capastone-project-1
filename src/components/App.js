import {auth} from "../firebaseProvider";
import React from "react";
import Login from "./Login";
import Home from "./Home";

function App() {
    let [currentUser, setCurrentUser] = React.useState()
    return (
        <div className="App">
            {currentUser ? <Home/> : <Login/>}
        </div>
    );
}

export default App;
