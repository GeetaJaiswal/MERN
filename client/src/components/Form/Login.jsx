import React, { useState } from 'react';
import {Grid, Box, Paper, Toolbar, Typography, FormControl, OutlinedInput, makeStyles, Button} from '@material-ui/core';
import { LoginUser } from '../../services/api';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 0",
    },
    formLabel: {
        marginBottom: 10,
        fontWeight: 500
    },
    formText: {
        width: "280px",
    },
    loginButton: {
        width: "280px", 
        height:"50px",
        marginBottom:"20px"
    }
})



const Login = () => {
    const classes = useStyles();
    const history = useHistory();
    
    const [user, setUser] = useState({email:"", password:""});

    const handleInput = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name]:e.target.value});
    }

    const postLogin = async() => {
        try {
            const res = await LoginUser(user);
            if(res.status===200)
            {
                history.push('/create');
            }
        }
        catch(e){
            console.log(`while user login ${e}`);
        }
    }

    return (
        <>
            <Toolbar/>
            <Grid container>
                <Grid item lg={4} md={4} sm={1} xs={1}></Grid>
                <Grid item lg={4} md={4} sm={10} xs={10}>
                    <Box>
                        <Paper px={10}>
                            <Box className={classes.container}>
                                <Box>
                                    <Typography align="center"><b>Sign in</b></Typography>
                                    <Box className={classes.formLabel} mt={2}>
                                        <label>Email</label>
                                    </Box>
                                    <FormControl variant="outlined" className={classes.formText}>
                                        <OutlinedInput
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                            'aria-label': 'weight',
                                            }}
                                            name="email"
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </FormControl>
                                </Box>    

                                <Box>
                                    <Box className={classes.formLabel} mt={2}>
                                        <label>Password</label>
                                    </Box>
                                    <FormControl variant="outlined" className={classes.formText}>
                                        <OutlinedInput
                                            aria-describedby="outlined-weight-helper-text"
                                            inputProps={{
                                            'aria-label': 'weight',
                                            }}
                                            name="password"
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                    </FormControl>
                                </Box>    
                                <Box mt={2}>
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                        className={classes.loginButton}
                                        onClick={postLogin}>
                                        Sign in
                                    </Button>
                                </Box>
                                <Typography>Don't have account? Sign up</Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item md={4} sm={1} xs={1}></Grid>
            </Grid>
        </>
    )
}

export default Login;
