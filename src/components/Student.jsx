import React from "react";
import {sessionRef} from "../firebaseProvider";
import {
    Button,
    Container,
    FormControl,
    Grid,
    LinearProgress,
    makeStyles,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import AnswerBoard from "./AnswerBoard";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
export default function Student(props) {
    const teacherUID = props.match.params.teacher_uid
    const [loading, setLoading] = React.useState(true)
    const [students, setStudents] = React.useState([])
    const [error, setError] = React.useState(null)
    const [student, setStudent] = React.useState('')
    const [submitted, setSubmitted] = React.useState(false)

    const classes = useStyles()
    const handleChange = (ev) => setStudent(ev.target.value)

    React.useEffect(() => {
        const getStudents = async () => {
            const query = sessionRef.where('teacher_uid', '==', teacherUID)
            try {
                await query.onSnapshot(snapshot => {
                    let students = []
                    snapshot.forEach(doc => {
                        students.push([doc.id, doc.data().student_name])
                    })

                    if (!students.length)
                        setError('No Students Found')
                    else {
                        setStudents(students)
                        setError(null)
                    }
                    setLoading(false)
                })
            } catch (e) {
                console.log(e.message)
                setError(e.message)
                setLoading(false)
            }
        }
        getStudents()
    }, [teacherUID])
    if (student && submitted) {
        let [id, name] = student.split(',')
        return <AnswerBoard studentId={id} studentName={name}/>
    }

    return (
        <Container maxWidth={'xl'} style={{padding: '2rem 9rem'}}>
            {loading ? <><Typography variant={'h4'} gutterBottom>Loading....</Typography>
                    <LinearProgress/></> :
                !!error || !students.length ? <Typography variant={'h6'}>Error: {error}</Typography> : (<>
                    <Grid container direction={'column'} spacing={2}>
                        <Typography variant={'h4'}>Select Your Name</Typography>
                        <Grid item xs={5}>

                            <FormControl className={classes.formControl}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={student}
                                    onChange={handleChange}
                                >{
                                    students.map(([id, name]) => <MenuItem key={id}
                                                                           value={id + ',' + name}>{name}</MenuItem>)
                                }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={() => setSubmitted(true)} variant={'contained'} color={'primary'}
                                    size={'small'}>Continue</Button>
                        </Grid>
                    </Grid>
                </>)
            }
        </Container>
    )
}