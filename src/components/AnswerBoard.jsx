import {Grid, TextField, Typography} from "@material-ui/core";
import React from "react";
import {sessionRef} from "../firebaseProvider";

export default function AnswerBoard({studentId, studentName}) {
    const query = sessionRef.doc(studentId)
    const [answer, setAnswer] = React.useState()
    React.useEffect(()=>{
        const resetAnswer = async ()=>{
            query.onSnapshot(snapshot => {
                if (!snapshot.data().content) setAnswer('')
                // snapshot.forEach(doc=> !doc.data().content && )
            })
        }
        resetAnswer()
    },[query])
    const updateAnswer = async (ans)=>{
        if (ans){
            setAnswer(ans)
            await query.update({
                content: ans
            })
        }
    }
    return (
        <Grid container direction={'column'} style={{padding: '4rem 15rem'}}>
            <Typography variant={'body2'} gutterBottom>
                {studentName}
            </Typography>
            <h1>My Answer</h1>

            <Typography variant={'body2'} gutterBottom>
                Enter your answer below. The text is visible to the teacher:
            </Typography>
            <Grid item>

                <TextField
                    multiline
                    rows={7}
                    value={answer}
                    onInput={event => updateAnswer(event.target.value)}
                    variant="outlined"
                    fullWidth
                />
            </Grid>

        </Grid>
    )
}