import React, {useState} from 'react';
import {Grid, Box, Paper, Toolbar, Typography, FormControl, OutlinedInput, makeStyles, Button} from '@material-ui/core';
import { getRegisterData } from '../../services/api';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme)=>({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0",
    },
    formLabel: {
        marginBottom: 10,
        fontWeight: 500
    },
    loginButton: {
        width: "280px", 
        height:"50px",
        marginBottom:"20px"
    },
    paper: {
        padding: "0 100px",
        [theme.breakpoints.down('sm')]: {
            padding: 50,
        }
    }
}))



const Register = () => {
    const classes = useStyles();
    const history = useHistory();

    const [user, setUser] = useState({
        name:"", email:"", password:"", cpassword:"", contact:"", location:"",
    });
    
    let name, value;
    
    const handleInputs = (e) => {
        //console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
    }


    const postData = async(e) => {
        try {
            e.preventDefault();
            // console.log(user);
            let response = await getRegisterData(user);
            let status = response.status;
            if(status===200){
            setUser({ name:"", email:"", password:"", cpassword:"", contact:"", location:"" });
            history.push('/login');
            }
        }
        catch(e){
            console.log(e);
        }
    }


    return (
        <>
            <Toolbar/>
            <Grid container>
                <Grid item lg={3} md={3} sm={1} xs={1}></Grid>
                <Grid item lg={6} md={6} sm={10} xs={10}>
                    <Box>
                        <Paper className={classes.paper}>
                            <Box className={classes.container}>
                                <Typography align="center"><b>Sign up</b></Typography>

                                <Grid container style={{marginTop:"20px"}}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Box>
                                        <Box className={classes.formLabel} mt={2}>
                                            <label>Name</label>
                                        </Box>
                                        <FormControl variant="outlined" className={classes.formText}>
                                            <OutlinedInput
                                                aria-describedby="outlined-weight-helper-text"
                                                inputProps={{
                                                'aria-label': 'weight',
                                                }}
                                                name="name"
                                                onChange={handleInputs}
                                                value={user.name}
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
                                                onChange={handleInputs}
                                                value={user.password}
                                            />
                                        </FormControl>
                                    </Box>  

                                    <Box>
                                        <Box className={classes.formLabel} mt={2}>
                                            <label>Contact</label>
                                        </Box>
                                        <FormControl variant="outlined" className={classes.formText}>
                                            <OutlinedInput
                                                aria-describedby="outlined-weight-helper-text"
                                                inputProps={{
                                                'aria-label': 'weight',
                                                }}
                                                name="contact"
                                                onChange={handleInputs}
                                                value={user.contact}
                                            />
                                        </FormControl>
                                    </Box>  
                                    </Grid>

                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <Box>
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
                                                    onChange={handleInputs}
                                                    value={user.email}
                                                />
                                            </FormControl>
                                        </Box>   

                                        <Box>
                                            <Box className={classes.formLabel} mt={2}>
                                                <label>Confirm Password</label>
                                            </Box>
                                            <FormControl variant="outlined" className={classes.formText}>
                                                <OutlinedInput
                                                    aria-describedby="outlined-weight-helper-text"
                                                    inputProps={{
                                                    'aria-label': 'weight',
                                                    }}
                                                    name="cpassword"
                                                    onChange={handleInputs}
                                                    value={user.cpassword}
                                                />
                                            </FormControl>
                                        </Box>  
                                        
                                        <Box>
                                            <Box className={classes.formLabel} mt={2}>
                                                <label>Location</label>
                                            </Box>
                                            <FormControl variant="outlined" className={classes.formText}>
                                                <OutlinedInput
                                                    aria-describedby="outlined-weight-helper-text"
                                                    inputProps={{
                                                    'aria-label': 'weight',
                                                    }}
                                                    name="location"
                                                    onChange={handleInputs}
                                                    value={user.location}
                                                />
                                            </FormControl>
                                        </Box>    
                                    </Grid>
                                </Grid>
                            
                                <Box mt={2}>
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                        className={classes.loginButton}
                                        onClick={postData}
                                    >
                                    Sign up
                                    </Button>
                                </Box>
                                <Typography>Already have account? Sign in</Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item lg={3} md={3} sm={1} xs={1}></Grid>
            </Grid>
        </>
    )
}

export default Register;
