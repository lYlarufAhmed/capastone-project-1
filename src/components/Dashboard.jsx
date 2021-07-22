import {Button, Grid, Link, TextField} from "@material-ui/core";
import React from "react";
import AuthContext from "./AuthProvider";

export default function Dashboard() {
    let {currentUser, answers, deleteAnswers} = React.useContext(AuthContext)
    let [ending, setEnding] = React.useState(false)
    let url = 'http://localhost:3000/' + currentUser.uid
    let handleClick = (ev) => {
        const confirmation = window.confirm("Do you want to End the session?")
        if (confirmation) {
            setEnding(true)
            deleteAnswers()
        }

    }

    return (
        <Grid container direction={'column'} style={{gap: '1.9rem'}}>
            <Grid container justifyContent={'space-between'} spacing={2}>
                <Grid item xs={5}>
                    <h1>Dashboard</h1>
                    <Link href={url}>{url}</Link>
                </Grid>
                <Grid item>
                    {ending && 'Ending session....'}
                    <Button variant={'contained'} onClick={handleClick} style={{marginLeft: '1rem'}}>End Session</Button>
                </Grid>
            </Grid>


            <Grid container style={{flexGrow: 1}} spacing={3}>{answers.sort(ans => ans.student_name).map(ans => (
                <Grid item xs={3}>
                    <TextField
                        key={ans.id}
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