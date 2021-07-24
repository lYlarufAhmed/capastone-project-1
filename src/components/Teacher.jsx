import {useDispatch, useSelector} from "react-redux";
import {Container} from "@material-ui/core";
import TopNav from "./TopNav";
import React from "react";
import {setError, setStudents, setStudentsLoading} from "../redux/actions";
import Loading from "./Loading";
import {sessionRef} from "../firebaseProvider";
import Dashboard from "./Dashboard";
import AddStudent from "./AddStudent";

export default function Teacher() {

    const currentUser = useSelector(state => state.app.currentUser)
    const dynamicStatus = useSelector(state => state.app.dynamicStatus)
    const loading = useSelector(state => state.students.loading)
    const students = useSelector(state => state.students.students)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (currentUser.uid && (!dynamicStatus && !students.length)) {
            // console.log('teacher useeffect', dynamicStatus)
            const query = sessionRef.where('teacher_uid', '==', currentUser.uid)
            const getStudents = async () => {
                try {
                    dispatch(setStudentsLoading(true))
                    let results = []
                    if (students.length) {
                        await query.onSnapshot(snapshot => {
                            snapshot.forEach(doc => {
                                let data = doc.data()
                                data.id = doc.id
                                results.push(data)
                            })

                        })

                    } else {
                        const snapShot = await sessionRef.where('teacher_uid', '==', currentUser.uid).get()
                        if (!snapShot.empty) {
                            snapShot.forEach(doc => {
                                let data = doc.data()
                                data.id = doc.id
                                results.push(data)
                            })
                        }
                    }
                    if (!dynamicStatus) {
                        // console.log('the target block', loading)
                        if (results.length !== students.length) {
                            dispatch(setStudents(results))
                            dispatch(setError(null))
                        } else {
                            if (!results.length) {
                                // console.log('loading', loading)
                                dispatch(setStudentsLoading(false))
                            }
                        }

                    }
                } catch (e) {
                    dispatch(setError(e.message))
                }

            }
            getStudents()


        }
    }, [currentUser.uid, dispatch, dynamicStatus, students.length])
    return (
        <Container maxWidth={'xl'}>
            <TopNav/>
            {loading ? <Loading/> : students.length && dynamicStatus !== 'submitting' ? <Dashboard/> : <AddStudent/>}
        </Container>
    )
}