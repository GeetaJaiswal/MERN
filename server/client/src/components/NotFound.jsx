import React from 'react';
import { Button, Typography, Box,} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: 500,
        verticalAlign: "middle"
    },
    
})


function NotFound() {
    const classes = useStyles();
    return (
        <>
        <Box className={classes.root} >
            <Typography variant="h3">Page Not Found</Typography><br/>  
            <Button variant="contained" color="secondary">
            <Typography  component={NavLink} to='/' color="inherit" classes={classes.text} style={{textDecoration: "none"}}>
            Back to HomePage
            </Typography>
            </Button>
        </Box>    
        </>
    )
}

export default NotFound
