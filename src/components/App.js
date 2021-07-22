import {auth, sessionRef} from "../firebaseProvider";
import React, {useEffect} from "react";
import Login from "./Login";
import Home from "./Home";
import AuthContext from "./AuthProvider";
import TopNav from "./TopNav";
import {Container, LinearProgress, Typography} from "@material-ui/core";

function App() {
    let [answers, setAnswers] = React.useState([])
    let [currentUser, setCurrentUser] = React.useState({})
    let [loading, setLoading] = React.useState(true)
    let [error, setError] = React.useState(null)
    useEffect(() => {
        if (!!localStorage.getItem('firebaseAuthToken')) setLoading(false)
        const unregister = auth.onAuthStateChanged(async user => {
            console.log(user)
            if (user) {
                setCurrentUser(user)
                localStorage.setItem('firebaseAuthToken', user.refreshToken)
                setError(null)
            }
        })
        return () => unregister()
    }, [])

    React.useEffect(() => {
        if (currentUser.uid) {
            const query = sessionRef.where('teacher_uid', '==', currentUser.uid)
            const getStudents = async () => {
                try {
                    await query.onSnapshot(snapshot => {
                        let students = []
                        snapshot.forEach(doc => {
                            let data = doc.data()
                            data.id = doc.id
                            students.push(data)
                        })
                        setAnswers(students)
                    })
                    setError(null)
                } catch (e) {
                    setError(e.message)
                }

            }
            getStudents().then(() => setLoading(false))

        }
    }, [currentUser.uid])
    const deleteAnswers = async () => {
        answers.forEach(async (ans) => {
            await sessionRef.doc(ans.id).delete()
        })
    }
    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser, answers, deleteAnswers}}>
            {loading ? (<> <Typography variant={'h4'} gutterBottom>Loading....</Typography>
                <LinearProgress/>
            </>) : (<Container maxWidth={'xl'}>
                {
                    error ? <Typography variant={'h6'}>Error: {error}</Typography> : (<>
                        <TopNav/>
                        {currentUser.displayName ? <Home/> : <Login/>}
                    </>)
                }

            </Container>)}

        </AuthContext.Provider>
    );
}

export default App;
