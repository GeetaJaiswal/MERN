import React, {useState} from 'react'
import {Grid, Paper, Typography, Box, FormControl, TextField, InputAdornment, Input, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import logo from '../images/logo.png';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {NavLink} from 'react-router-dom';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    image: {
        width: "200px",
    },
    loginLeft: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
            alignItems: "center"
    }
})

const Login = () => {
    const classes = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const response = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email,password})
        })

        console.log(response);
        
        if(response.status===204)
        {
            window.alert("Please fill all fields");
        }
        else if(response.status===400)
        {
            window.alert("Invalid Details");
        }
        else if(response.status===403)
        {
            window.alert("You are not yet registered");
            history.push("/register");
        }
        else if(response.status===200)
        {
            history.push("/about");
        }
    }



    return (
        <Grid item container lg={12} mt={12}>
        <Grid lg={3} xs={1}></Grid>
            <Paper component={Grid} container item lg={6} md={6} xs={10} p={5} align="center">
                <Grid item lg={6} sm={6} xs={12} container className={classes.loginLeft}>
                    <img src={logo} alt="logo" className={classes.image}/>
                    <Typography>Don't have account yet? <NavLink to='/register'>Register</NavLink></Typography>
                </Grid>
                <Grid item lg={6} sm={6} xs={12} container>
                    <Typography variant="h5" color="secondary" mb={2}>Sign In</Typography>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                        <Input
                        id="standard-adornment-password"
                        placeholder="Username"
                        color="secondary"
                        startAdornment={
                        <InputAdornment position="start">
                            <PersonIcon color="secondary"/>
                        </InputAdornment>
                        }
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                        <Input
                        id="standard-adornment-password"
                        placeholder="Password"
                        fullWidth
                        color="secondary"
                        startAdornment={
                        <InputAdornment position="start">
                             <VpnKeyIcon color="secondary"/>
                        </InputAdornment>
                        }
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                            
                    <FormControl style={{marginTop: "15px", float: "right"}}>
                        <Button variant="contained" color="secondary" onClick={loginUser}>LogIn</Button>
                    </FormControl>
                </Grid>
            </Paper>
            <Grid lg={3} xs={1}></Grid>
        </Grid>
    )
}

export default Login

