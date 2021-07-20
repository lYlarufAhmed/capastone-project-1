import React from "react";
import {sessionRef} from '../firebaseProvider'
import AuthContext from "./AuthProvider";

export default function Home() {
    let [submitting, setSubmitting] = React.useState(false)
    let [answers, setAnswers] = React.useState([])
    let inputRef = React.useRef()
    let {currentUser} = React.useContext(AuthContext)
    let url = 'http://localhost:3000/' + currentUser.uid
    React.useEffect(() => {
        const query = sessionRef.where('teacher_uid', '==', currentUser.uid)
        const getStudents = async () => {
            try {
                await query.onSnapshot(snapshot => {
                    let students = []
                    snapshot.forEach(doc => {
                        students.push(doc.data())
                    })
                    setAnswers(students)
                })
            } catch (e) {
                alert(e.message)
            }

        }
        getStudents()
    }, [currentUser.uid])
    const handleSubmit = async () => {
        let val = inputRef.current.value
        console.log(val)
        let student_names = []
        if (val) {
            setSubmitting(true)
            if (val.includes(','))
                student_names = val.split(',')
            else
                student_names = val.split('\n')
            for (let studentName of student_names) {
                let doc = {
                    "student_name": studentName,
                    teacher_uid: currentUser.uid
                }
                try {

                    await sessionRef.add(doc)
                } catch (e) {
                    alert(e.message)
                }
            }

            setSubmitting(false)
        }
    }
    return (
        <div className={'Wrapper'}>
            {answers.length ? (
                <>
                    <h1>Dashboard</h1>
                    <a href={url}>{url}</a>
                    {answers.sort(ans => ans.student_name).map(ans => (<div className={'AnswerWrapper'}>
                            <div className={'InputControl'}>
                                <label htmlFor={ans.id}>
                                    {ans.student_name}
                                    <textarea id={ans.id} value={ans.content}/>
                                </label>
                            </div>
                        </div>
                    ))}
                </>) : (<>
                <h1>My Students</h1>

                <textarea ref={inputRef}>

                </textarea>
                <button onClick={handleSubmit}>Submit</button>
                {submitting && 'Submitting.......'}</>)}
        </div>
    )
}