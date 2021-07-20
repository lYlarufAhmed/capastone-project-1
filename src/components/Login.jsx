import {uiConfig, auth} from '../firebaseProvider'
import {StyledFirebaseAuth} from "react-firebaseui";



export default function Login() {
    // let {setCurrentUser} = useContext(AuthContext)
    // useEffect(() => {
    //     const unregister = auth.onAuthStateChanged(user => {
    //         console.log(user)
    //         if (user)
    //             setCurrentUser(user)
    //     })
    //     return unregister()
    // }, [setCurrentUser])
    return (
        <div>
            <h1>Everyone Answer</h1>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </div>
    )
}