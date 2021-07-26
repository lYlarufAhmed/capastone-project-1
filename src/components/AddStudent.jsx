import React from "react";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createStudents} from "../redux/actions";

export default function AddStudent() {
    const dynamicStatus = useSelector(state => state.app.dynamicStatus)
    const dispatch = useDispatch()

    let [textAreaInput, setTextAreaInput] = React.useState()
    return (
        <Container maxWidth={'sm'} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>

            <Typography variant={'h3'}>My Students</Typography>

            <Typography variant={'body2'} gutterBottom>
                Enter the names of each person who will answer your questions, separated by comma or new line
            </Typography>
            {/*<Grid item>*/}

                <TextField
                    multiline
                    rows={7}
                    onInput={event => setTextAreaInput(event.target.value)}
                    variant="outlined"
                    fullWidth
                    placeholder={'eg. David, Kim, Rajesh'}
                />
            {/*</Grid>*/}
            <Grid item>
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