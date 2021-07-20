import {auth} from "../firebaseProvider";
import React, {useEffect} from "react";
import Login from "./Login";
import Home from "./Home";
import AuthContext from "./AuthProvider";
import TopNav from "./TopNav";

function App() {
    let [currentUser, setCurrentUser] = React.useState({})
    // const Context = React.useContext(AuthContext)
    useEffect(() => {
        const unregister = auth.onAuthStateChanged(user => {
            console.log(user)
            if (user)
                setCurrentUser(user)
        })
        return () => unregister()
    }, [])
    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser}}>
            <div className="App">
                <TopNav/>
                {currentUser.displayName ? <Home/> : <Login/>}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
