import {AppBar, Toolbar, Typography, makeStyles} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    component: {
        background: "#ffffff",
        color: "black",
    },
    container: {
        justifyContent: "center",
        '&>*': {  // for child component=
            padding: 20,
        }
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
})


const Navbar = () => {
    const classes = useStyles();
    return(
        <>
            <AppBar className={classes.component}>
                <Toolbar className={classes.container}>
                    <Link to='/' className={classes.link}>
                    <Typography>Home</Typography>
                    </Link>
                    <Link to='/login' className={classes.link}>
                        <Typography>Login</Typography>
                    </Link>
                    <Link to='/signup' className={classes.link}>
                        <Typography>Sign up</Typography>
                    </Link>    
                    </Toolbar>                    
            </AppBar>
        </>
    )
}

export default Navbar;
