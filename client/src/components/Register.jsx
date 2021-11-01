import React, {useState} from 'react'
import {Grid, Paper, Typography, Box, FormControl, TextField, InputAdornment, Input, Button, Hidden} from '@mui/material';
// import {makeStyles} from '@mui/styles';
import register from '../images/register.jpg';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LockIcon from '@mui/icons-material/Lock';
import {NavLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    image: {
        width: "100%",
        height: "60vh",
        marginTop: "-50px",
    },
}));



const Register = () => {
    const classes = useStyles();
    const history = useHistory();
    
    const [user, setUser] = useState({
        name:"", email:"", phone:"", work:"", password:"", cpassword:""
    });
    
    let name, value;
    
    const handleInputs = (e) => {
        //console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value});
    }
    
    const postData = async(e) => {
        e.preventDefault();
        const {name, email, phone, work, password, cpassword} = user;
        console.log(user);

        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type":"application/json" 
            },
            body: JSON.stringify({name, email, phone, work, password, cpassword})
        })
        console.log(user);
        console.log(res);
        // const data = await res.json();
        // console.log(data);
        if(res.status===204 )
        {
            window.alert("Please fill all the fields");
            console.log(res);
            // console.log(data);
        }
        else if(res.status===403)
        {
            window.alert("User already exists");
            console.log(res);
            // console.log(data);
        }
        else if(res.status===500)
        {
            window.alert("failed to register");
        }
        else if(res.status===200)
        {
            window.alert("you are successfully registered");
            history.push("/");
        }
    }
    
    return (
        <Grid item lg={12} container>
        <Grid lg={2} xs={12}></Grid>
        <Paper component={Grid} item container lg={8} xs={12} mx="auto" mt={5} p={5}>
            <Grid item lg={12} sm={12} xs={12} container>
            <Typography variant="h5" color="secondary" mb={2}>SignUp</Typography>
            </Grid>
            <Grid item lg={6} sm={6} xs={12} container order={{lg:1, xs:2}}>
            <form method="POST">
                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                <Input
                id="standard-adornment-password"
                placeholder="Your name"
                color="secondary"
                startAdornment={
                    <InputAdornment position="start">
                        <PersonIcon color="secondary"/>
                    </InputAdornment>
                }
                name="name"
                value={user.name}
                onChange={handleInputs}
                />                                
                </FormControl>

                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                    <Input
                    id="standard-adornment-password"
                    placeholder="Email"
                    fullWidth
                    color="secondary"
                    startAdornment={
                    <InputAdornment position="start">
                        <EmailIcon color="secondary"/>
                    </InputAdornment>
                    }
                    name="email"
                    value={user.email}
                    onChange={handleInputs}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                    <Input
                        id="standard-adornment-password"
                        placeholder="phone"
                        fullWidth
                        color="secondary"
                        startAdornment={
                        <InputAdornment position="start">
                            <PhoneIcon color="secondary"/>
                        </InputAdornment>
                        }
                        name="phone"
                        value={user.phone}
                        onChange={handleInputs}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                    <Input
                        id="standard-adornment-password"
                        placeholder="Your work"
                        fullWidth
                        color="secondary"
                        startAdornment={
                        <InputAdornment position="start">
                            <BusinessCenterIcon color="secondary"/>
                        </InputAdornment>
                        }
                        name="work"
                        value={user.work}
                        onChange={handleInputs}
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
                        value={user.password}
                        onChange={handleInputs}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                    <Input
                        id="standard-adornment-password"
                        placeholder="Confirm Password"
                        fullWidth
                        color="secondary"
                        startAdornment={
                        <InputAdornment position="start">
                            <LockIcon color="secondary"/>
                        </InputAdornment>
                        }
                        name="cpassword"
                        value={user.cpassword}
                        onChange={handleInputs}
                    />
                </FormControl>
                            
                <FormControl style={{marginTop: "15px"}}>
                    <Button variant="contained" color="secondary" type="submit" onClick={postData}>Register</Button>
                </FormControl> 
            </form>                   
            </Grid>
    
            <Grid item lg={6} sm={6} xs={12} order={{lg:2, xs:1}}>
            <Hidden only="xs">
                <img src={register} alt="register" className={classes.image}/>
            </Hidden>    
            <Typography align="center">Already have account?
            <NavLink to='/login'>Login</NavLink>
            </Typography>
            </Grid>
        </Paper>  
        <Grid lg={2} xs={12}></Grid>
        </Grid>
  );
}


export default Register
