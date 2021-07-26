import {uiConfig, auth} from '../firebaseProvider'
import {StyledFirebaseAuth} from "react-firebaseui";
import {Container, makeStyles, Typography} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: 'center',
        paddingTop: '2rem'
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
            <Typography variant={'h4'} gutterBottom>Everyone Answer</Typography>
            <Typography variant={'body1'} gutterBottom>Welcome. Please sign in.</Typography>
            <AccountCircleIcon fontSize={"large"} className={classes.fontSize} color={'disabled'}/>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </Container>
    )
}