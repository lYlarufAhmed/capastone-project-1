import React from "react";
import {auth} from '../firebaseProvider'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../redux/actions";

export default function TopNav() {
    const currentUser = useSelector(state => state.app.currentUser)
    const dispatch = useDispatch()
    const sigOutHandler = async () => {
        await auth.signOut()
        dispatch(setCurrentUser(null))
    }
    if (currentUser)
        return (

            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <button id="logout" onClick={sigOutHandler}><img src={currentUser.photoURL}
                                                                 alt={currentUser.displayName}/></button>
            </nav>
        )
}