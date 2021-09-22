import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {auth} from "../firebaseProvider";
import {setCurrentUser, setAppLoading} from "../redux/actions";
import {Grid} from "@material-ui/core";
import Loading from "./Loading";
import Login from "./Login";
import Teacher from "./Teacher";


export default function Home() {
    const dispatch = useDispatch()
    React.useEffect(() => {
        const unregister = auth.onAuthStateChanged(async user => {
            if (user) {
                dispatch(setCurrentUser(user))
            }else{
                dispatch(setAppLoading(false))
            }
        })
        return () => unregister()
        // eslint-disable-next-line
    }, [])
    const loading = useSelector(state => state.app.loading)
    const currentUser = useSelector(state => state.app.currentUser)
    return (
        <Grid container direction={'column'}>
            {loading ? <Loading/> : !!currentUser ? <Teacher/> : <Login/>}
        </Grid>

    )
}
