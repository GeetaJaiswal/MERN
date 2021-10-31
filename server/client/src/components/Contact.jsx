import React, {useState, useEffect} from 'react';
import { Container, Grid, Paper, IconButton, Box, Typography, FormControl, OutlinedInput, Button, TextField,
             } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmailIcon from '@mui/icons-material/Email';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    contactInfo: {
        display: "flex",
        flexDirection: "row",
        padding: "50px 50px",
        [theme.breakpoints.down('xs')]: {
            padding: "20px 20px",
        },
    },
    contactTopPaper: {
        padding: "20px 30px",
        display: "flex",
        justifyContent: "center",
    },
    contactBottomPaper: {
        padding: "30px 30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        [theme.breakpoints.down('xs')]: {
            padding: "10px 15px",
        },
    },
    contactBottom: {
        padding: "20px 150px",
        [theme.breakpoints.down('xs')]: {
            padding: "10px 20px",
        },
    },
    textarea: {
        width: "920px",
        [theme.breakpoints.down('xs')]: {
            width: "250px",
        },
    },
}))


function Contact() {
    const classes = useStyles();
    const [userData, setUserdata] = useState({name: "", email: "", phone: "", message: ""});

    // get user data
    const getContactPage = async () => {
        try{
        const res = await fetch('/getData', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await res.json();
        console.log(data);
        console.log(res);
        setUserdata({...userData, name:data.name, email:data.email, phone:data.phone});

        if(!res.status===200)
            {
                throw new Error(res.error);
            }
    } catch(e){
        console.log(e);
    }
    }


    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserdata({...userData, [name]:value});
    }



    useEffect(() => {
    getContactPage();
    }, [])



    //save user data
    const userContact = async (e) => {
        console.log("hi");
        e.preventDefault();
        const {name, email, phone, message} = userData;

        const res = await fetch('/contact', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, phone, message})
        })

        console.log(res);
        // const data = await res.json();
        // console.log("data");

        if(res.status===204)
        {
            console.log(res);
            window.alert("unable to send data");
        }
        else
        {
            window.alert("message sent");
            setUserdata({...userData, message:""});
        }
    }
    
    
    return (
        <>
        <Grid item container lg={12} md={12} xs={12} className="contactTop">
            <Grid item container lg={4} md={4} xs={12} className={classes.contactInfo}>
                <Paper component={Grid} item lg={12} xs={12} className={classes.contactTopPaper}>
                    <Grid item lg={2} md={2} xs={4}>
                        <IconButton>
                            <BusinessCenterIcon color="secondary"/>
                        </IconButton>
                    </Grid>
                    <Grid item lg={10} md={10} xs={8}>
                        <Typography variant="h6">Phone</Typography>
                        <small>+919876545678</small>
                    </Grid>    
                </Paper>
            </Grid>
            <Grid item  container lg={4} md={4} xs={12} className={classes.contactInfo}>
                <Paper component={Grid} item lg={12} xs={12} className={classes.contactTopPaper}>
                    <Grid item lg={2} md={2} xs={4}>
                        <IconButton>
                            <EmailIcon color="secondary"/>
                        </IconButton>
                    </Grid>
                    <Grid item lg={10} md={10} xs={8}>
                        <Typography variant="h6">Phone</Typography>
                        <small>demo@gmail.com</small>
                    </Grid>    
                </Paper>
            </Grid>
            <Grid item container lg={4} md={4} xs={12} className={classes.contactInfo}>
                <Paper component={Grid} item lg={12} xs={12} className={classes.contactTopPaper}>
                    <Grid item lg={2} md={2} xs={4}>
                        <IconButton>
                            <EditLocationIcon color="secondary" />
                        </IconButton>
                    </Grid>
                    <Grid item lg={10} md={10} xs={8}>
                        <Typography variant="h6">Phone</Typography>
                        <small>Delhi, India</small>
                    </Grid>    
                </Paper>
            </Grid>
        </Grid>

    <form method="POST">
        <Grid item container lg={12} md={12} xs={12} className={classes.contactBottom}>
            <Paper component={Grid} item container lg={12} md={12} s={12}  pb={5} className={classes.contactBottomPaper}>
                <Grid item lg={12} p={5} pb={1}>
                    <Typography variant="h5">Get In Touch</Typography>
                </Grid>
                <Grid item lg={4} md={4} xs={12} className={classes.contactBottomPaper} mx="auto">
                    <FormControl variant="standard">
                        <OutlinedInput sx={{ width: '28ch' }} color="secondary" placeholder="Please enter name"
                        value={userData.name} name="name" onChange={handleInputs} />
                    </FormControl>
                </Grid>
                <Grid item lg={4} md={4} xs={12} className={classes.contactBottomPaper} mx="auto">
                    <FormControl variant="standard" >
                        <OutlinedInput sx={{ width: '28ch' }} color="secondary" placeholder="Please enter email"
                         value={userData.email} name="email" onChange={handleInputs}/>
                    </FormControl>
                </Grid>
                <Grid item lg={4} md={4} xs={12} className={classes.contactBottomPaper} mx="auto">
                    <FormControl variant="standard" >
                        <OutlinedInput sx={{ width: '28ch' }} color="secondary" placeholder="Please enter phone"
                        name="phone" onChange={handleInputs} value={userData.phone} />
                    </FormControl>
                </Grid>
                <Grid item lg={12} md={12} xs={12} className={classes.contactBottomPaper} mx="auto">
                    <FormControl className={classes.textarea}>
                        <TextField
                            placeholder="Enter Message"
                            color="secondary"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={6}
                            name="message"
                            onChange={handleInputs}
                            value={userData.message}
                        />
                    </FormControl>  
                </Grid>     
                    <Box>
                        <Button variant="contained" color="secondary" onClick={userContact} style={{marginTop:"20px", padding: "10px 10px"}}>Send Message</Button>
                    </Box>    
            </Paper>
        </Grid>    
    </form>                            

        </>
    )
}

export default Contact
