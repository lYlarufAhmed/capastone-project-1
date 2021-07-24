import {Button, Container, Grid, Link, TextField, Typography} from "@material-ui/core";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteStudents,
    resetAnswers,
    setDynamicStatus,
    setError,
    setStudents
} from "../redux/actions";
import {sessionRef} from "../firebaseProvider";

export default function Dashboard() {
    let currentUser = useSelector(state => state.app.currentUser)
    let dispatch = useDispatch()
    let students = useSelector(state => state.students.students)
    let dynamicStatus = useSelector(state => state.app.dynamicStatus)
    // let [resetting, setResetting] = React.useState(false)
    let url = 'http://localhost:3000/s/' + currentUser.uid
    const handleClick = (ev) => {
        const confirmation = window.confirm("Do you want to End the session?")
        if (confirmation) {
            dispatch(setDynamicStatus('ending'))
            dispatch(deleteStudents(currentUser.uid))
            // setEnding(true)
            // deleteAnswers()
        }

    }

    const handleReset = () => {
        // setResetting(true)
        dispatch(resetAnswers(currentUser.uid))
        // setResetting(false)
    }

    React.useEffect(() => {
        const getUpdate = async () => {
            console.log('called get update')
            try {
                const query = sessionRef.where('teacher_uid', '==', currentUser.uid)
                await query.onSnapshot(snapshot => {
                    let results = []
                    console.log('snap shot found')
                    snapshot.forEach(doc => {
                        let data = doc.data()
                        data.id = doc.id
                        results.push(data)
                    })
                    if (results.length) {
                        console.log(results)
                        dispatch(setStudents(results))
                    }
                })

            } catch (e) {
                dispatch(setError(e.message))
            }

        }
        getUpdate()
    }, [currentUser.uid, dispatch])

    return (
        <Grid container direction={'column'} style={{gap: '1.9rem'}}>
            <Grid container justifyContent={'space-between'} spacing={2}>
                <Grid item xs={6}>
                    <Container style={{display: 'flex', height: '3rem', alignItems: 'center', gap: '1rem'}}>
                        <h1>Dashboard</h1>
                        <Grid item>
                            <Button variant={'contained'} color={'primary'} size={'small'} onClick={handleReset}>Clear
                                Answer</Button>
                            {dynamicStatus === 'resetting' &&
                            <Typography variant={'body2'}>Clearing the answer....</Typography>}
                        </Grid>
                    </Container>
                    <Link href={url} target={'_blank'}>{url}</Link>
                </Grid>
                <Grid item>
                    {dynamicStatus === 'ending' && 'Ending session....'}
                    <Button variant={'contained'} onClick={handleClick} style={{marginLeft: '1rem'}}>End
                        Session</Button>
                </Grid>
            </Grid>


            <Grid container style={{flexGrow: 1}} spacing={3}>{students.sort(ans => ans.student_name).map(ans => (
                <Grid key={ans.id} item xs={3}>
                    <TextField
                        id={ans.id}
                        label={ans.student_name}
                        multiline
                        rows={4}
                        value={ans.content}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            ))}</Grid>

        </Grid>
    )
}