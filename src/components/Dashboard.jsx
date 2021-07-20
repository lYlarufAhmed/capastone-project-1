import {Grid, Link, TextField} from "@material-ui/core";
import React from "react";
import AuthContext from "./AuthProvider";

export default function Dashboard() {
    let {currentUser, answers} = React.useContext(AuthContext)
    let url = 'http://localhost:3000/' + currentUser.uid

    return (
        <Grid container direction={'column'} style={{gap: '1.9rem'}}>
            <h1>Dashboard</h1>
            <Link href={url}>{url}</Link>

            <Grid container direction={'row'}
                  spacing={2}>{answers.sort(ans => ans.student_name).map(ans => (
                <TextField
                    key={ans.id}
                    id={ans.id}
                    label={ans.student_name}
                    multiline
                    rows={4}
                    value={ans.content}
                    variant="outlined"
                />
            ))}</Grid>

        </Grid>
    )
}