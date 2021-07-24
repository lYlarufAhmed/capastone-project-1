import React from "react";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createStudents} from "../redux/actions";

export default function AddStudent() {
    const dynamicStatus = useSelector(state => state.app.dynamicStatus)
    const dispatch = useDispatch()

    let [textAreaInput, setTextAreaInput] = React.useState()
    return (
        <Container maxWidth={'xl'}>

            <h1>My Students</h1>

            <Typography variant={'body2'} gutterBottom>
                Enter the comma new line seperated Names:
            </Typography>
            <Grid item>

                <TextField
                    multiline
                    rows={7}
                    onInput={event => setTextAreaInput(event.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <br/>
                <br/>
                <Button variant="contained" size={'small'} onClick={() => dispatch(createStudents(textAreaInput))}
                        color="primary"
                        style={{marginRight: '1rem'}}>
                    Submit
                </Button>
                {dynamicStatus === 'submitting' && 'Submitting.......'}
            </Grid>
        </Container>
    )
}