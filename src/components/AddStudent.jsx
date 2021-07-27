import React from "react";
import {Button, Container, Grid, Snackbar, TextField, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createStudents} from "../redux/actions";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function AddStudent() {
    const dynamicStatus = useSelector(state => state.app.dynamicStatus)
    const dispatch = useDispatch()
    let [warning, setWaring] = React.useState('')

    const handleClose = () => setWaring('')
    let [textAreaInput, setTextAreaInput] = React.useState('')
    return (
        <Container maxWidth={'sm'} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>

            <Snackbar open={!!warning} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    {warning}
                </Alert>
            </Snackbar>
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
                <Button variant="contained" size={'small'} onClick={() => {
                    if (textAreaInput) {
                        let student_names
                        if (textAreaInput.includes(','))
                            student_names = textAreaInput.split(',')
                        else
                            student_names = textAreaInput.split('\n')
                        if (student_names.length !== new Set(student_names).size) setWaring('Duplicate name!')
                        else
                            dispatch(createStudents(textAreaInput))
                    } else {
                        setWaring('Empty!')
                    }
                }}
                        color="primary"
                        style={{marginRight: '1rem'}}>
                    Submit
                </Button>
                {dynamicStatus === 'submitting' && 'Submitting.......'}
            </Grid>
        </Container>
    )
}