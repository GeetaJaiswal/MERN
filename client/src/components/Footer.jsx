import {AppBar, Toolbar, Typography, makeStyles, Box} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    component: {
        background: "#ffffff",
        color: "black",
    },
    container: {
        justifyContent: "center",
        // '&>*': {  // for child component=
        //     padding: 20,
        // }
    },
    // link: {
    //     textDecoration: "none",
    //     color: "inherit",
    // },
})


const Footer = () => {
    const classes = useStyles();
    return(
        <>
            <Toolbar/>
            <Box className={classes.component}>
                <Toolbar className={classes.container}>
                    <Typography>All rights reserved ©2021</Typography>
                </Toolbar>               
            </Box>
        </>
    )
}

export default Footer;
