import {auth, sessionRef} from "../firebaseProvider";
import React, {useEffect} from "react";
import Login from "./Login";
import Home from "./Home";
import AuthContext from "./AuthProvider";
import TopNav from "./TopNav";

function App() {
    let [answers, setAnswers] = React.useState([])
    let [currentUser, setCurrentUser] = React.useState({})
    let [loading, setLoading] = React.useState(true)
    useEffect(() => {
        if (!localStorage.getItem('firebaseAuthToken')) setLoading(false)
        const unregister = auth.onAuthStateChanged(async user => {
            console.log(user)
            if (user) {
                setCurrentUser(user)
                localStorage.setItem('firebaseAuthToken', user.refreshToken)
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
                } catch (e) {
                    alert(e.message)
                }

            }
            getStudents().then(() => setLoading(false))

        }
    }, [currentUser.uid])
    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser, answers, loading, setLoading}}>
            {loading ? 'Loading.....' : (<div className="App">
                <TopNav/>
                {currentUser.displayName ? <Home/> : <Login/>}
            </div>)}

        </AuthContext.Provider>
    );
}

export default App;
