import {Button, Grid, Link, TextField, Typography} from "@material-ui/core";
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
    let url = document.URL + currentUser.uid
    const handleClick = (ev) => {
        const confirmation = window.confirm("Do you want to End the session?")
        if (confirmation) {
            dispatch(setDynamicStatus('ending'))
            dispatch(deleteStudents(currentUser.uid))
        }

    }

    const handleReset = () => dispatch(resetAnswers(currentUser.uid))


    React.useEffect(() => {
        const getUpdate = async () => {
            try {
                const query = sessionRef.where('teacher_uid', '==', currentUser.uid)
                await query.onSnapshot(snapshot => {
                    let results = []
                    snapshot.forEach(doc => {
                        let data = doc.data()
                        data.id = doc.id
                        results.push(data)
                    })
                    if (results.length) {
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
        <Grid container direction={'column'} style={{gap: '.5rem'}}>

            <Grid container justifyContent={'space-between'}>
                <Grid container alignItems={'center'} justifyContent={'space-between'}
                      xs={6}>
                    <Typography variant={'h4'}>Dashboard</Typography>
                    <Grid container justifyContent={'space-between'} xs={7}>
                        <Button variant={'contained'} color={'primary'} size={'small'} onClick={handleReset}>Clear
                            Answer</Button>
                        {dynamicStatus === 'resetting' &&
                        <Typography variant={'body2'}>Clearing the answer....</Typography>}
                    </Grid>

                </Grid>

                <Grid xs={3} container alignItems={'center'}
                      justifyContent={dynamicStatus === 'ending' ? 'space-between' : 'flex-end'}>
                    {dynamicStatus === 'ending' && 'Ending session....'}
                    <Button variant={'contained'} size={'small'} onClick={handleClick}>End
                        Session</Button>
                </Grid>
            </Grid>
            <Grid container alignItems={'center'}>
                <Typography variant={'body1'}>Student Link:</Typography> <Link href={url} target={'_blank'}>{url}</Link>
            </Grid>
            <Grid container style={{flexGrow: 1}}
                  spacing={3}>{students.sort((a, b) => a.student_name.localeCompare(b.student_name)).map(ans => (
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
                        contentEditable
                    />
                </Grid>
            ))}</Grid>
        </Grid>
    )
}


// <Grid container justifyContent={'space-between'} spacing={2}>
//     <Grid item xs={6}>
//         <Container style={{display: 'flex', height: '3rem', alignItems: 'left', gap: '1rem'}}>
//             <Grid item direction={'column'}>
//                 <Typography variant={'h4'}>Dashboard</Typography>
//                 <Grid item>
//                     <Button variant={'contained'} color={'primary'} size={'small'} onClick={handleReset}>Clear
//                         Answer</Button>
//                     {dynamicStatus === 'resetting' &&
//                     <Typography variant={'body2'}>Clearing the answer....</Typography>}
//                 </Grid>
//             </Grid>
//         </Container>
//         <Link href={url} target={'_blank'}>{url}</Link>
//     </Grid>
//     <Grid item>
//         {dynamicStatus === 'ending' && 'Ending session....'}
//         <Button variant={'contained'} onClick={handleClick} style={{marginLeft: '1rem'}}>End
//             Session</Button>
//     </Grid>
//
// </Grid>
//
//

