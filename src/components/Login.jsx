import {uiConfig, auth} from '../firebaseProvider'
import {StyledFirebaseAuth} from "react-firebaseui";
import {Container, makeStyles} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: 'center'
    }
    ,
    fontSize: {
        fontSize: theme.spacing(24)
    }
}))

export default function Login() {
    const classes = useStyles()
    return (
        <Container maxWidth={"lg"} className={classes.container} disableGutters={true}>
            <h1>Everyone Answer</h1>
            <AccountCircleIcon fontSize={"large"} className={classes.fontSize} color={'disabled'}/>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </Container>
    )
}