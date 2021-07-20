import React from "react";
import AuthContext from "./AuthProvider";
import {auth} from '../firebaseProvider'

export default function TopNav() {
    const {currentUser, setCurrentUser} = React.useContext(AuthContext)
    const sigOutHandler = async () => {
        await auth.signOut()
        setCurrentUser({})
        localStorage.setItem('firebaseAuthToken', null)
    }
    if (currentUser)
        return (

            <nav>
                <button id="logout" onClick={sigOutHandler}><img src={currentUser.photoURL}
                                                                 alt={currentUser.displayName}/></button>
            </nav>
        )
}