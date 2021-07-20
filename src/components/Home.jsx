import React from "react";
import {sessionRef} from '../firebaseProvider'
import AuthContext from "./AuthProvider";
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import Dashboard from "./Dashboard";

export default function Home() {
    let [submitting, setSubmitting] = React.useState(false)
    let [textAreaInput, setTexAreaInput] = React.useState()

    let {currentUser, answers} = React.useContext(AuthContext)
    const handleSubmit = async () => {
        console.log(textAreaInput)
        let student_names = []
        if (textAreaInput) {
            setSubmitting(true)
            if (textAreaInput.includes(','))
                student_names = textAreaInput.split(',')
            else
                student_names = textAreaInput.split('\n')
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
    if (answers.length) {
        return <Dashboard/>
    }
    return (

        <Grid container direction={'column'} spacing={4}>
            <h1>My Students</h1>

            <Typography variant={'body2'} gutterBottom>
                Enter the comma new line seperated Names:
            </Typography>
            <div>

                <TextField
                    multiline
                    rows={7}
                    onInput={event => setTexAreaInput(event.target.value)}
                    variant="outlined"
                />
                <br/>
                <br/>

                <Button variant="contained" size={'small'} onClick={handleSubmit} color="secondary">
                    Submit
                </Button>
                {submitting && 'Submitting.......'}
            </div>
        </Grid>

    )
}