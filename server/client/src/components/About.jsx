import React, {useState, useEffect} from 'react';
import { Grid, Paper, Typography, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, 
            Divider, ListItemButton, ListItemIcon, Tab, Tabs, TableHead, TableBody, TableCell, TableContainer,
        Table, TableRow } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import profile from '../images/profile1.png';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TabPanel from './TabPanel';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme)=>({
    root: {
        padding: "20px 100px 20px 100px",
        [theme.breakpoints.down('xs')]: {
            padding: "10px 0 0 0",
        }
    },
    proDet: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
    }
}))


function About() {

    const [tabVal, setTab] = useState(0);
    const [userData, setUserdata] = useState({});

    const handleTabs = (e,value) => {
        // console.log(value);
        setTab(value);
    }
    const classes = useStyles();

    const history = useHistory();

    const callAboutPage = async () => {
        try {
            const response = await fetch('/about', {
                method: "GET",
                header: {
                    Accept: "application./json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await response.json(); //you can see in browsers network
            console.log(data);
            setUserdata(data);

            if(!response.status===200)
            {
                throw new Error(response.error);
            }
        } catch(e){
            console.log(e);
            history.push("/login");
        }
    }

    useEffect(()=>{
        callAboutPage();
    })

    return (
        <>
        <Grid container lg={2} md={2} xs={1}></Grid>
           <Grid container lg={8} md={8} xs={10} mx="auto" className={classes.root}>
               <Paper component={Grid} item container lg={12} md={12} xs={12} p={5}>
                    <Grid container lg={12} md={12} xs={12}>
                        <Grid item lg={4} md={4} xs={12}>
                            <img src={profile} alt="profile" width="200px" align="center"/>
                        </Grid>
                        <Grid item container lg={3} md={3} xs={12} className={classes.proDet}>
                            <Typography variant="h4">{userData.name}</Typography>
                            <Typography color="secondary" variant="h6">{userData.work}</Typography>
                            {/* <Typography variant="small"><b>Ranking:</b> 1/10</Typography> */}
                        </Grid>
                        <Grid item lg={3} md={3} xs={12}></Grid>
                        <Grid item container lg={2} md={2} xs={12} className={classes.proDet}>
                            {/* <Button variant="contained" color="secondary">Edit</Button> */}
                        </Grid>
                    </Grid>


                    <Grid container lg={12} md={12} xs={12}>
                        <Grid item lg={4} md={4} xs={12}>
                            {/* <List sx={{ width: '100%'}}>
                                <ListItem alignItems="flex-start">
                                        <ListItemIcon>
                                        <YouTubeIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="YouTube"/>
                                </ListItem>
                                <ListItem alignItems="flex-start">
                                        <ListItemIcon>
                                        <YouTubeIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="YouTube"/>
                                </ListItem>
                                <ListItem alignItems="flex-start">
                                        <ListItemIcon>
                                        <YouTubeIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="YouTube"/>
                                </ListItem>
                                <ListItem alignItems="flex-start">
                                        <ListItemIcon>
                                        <YouTubeIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="YouTube"/>
                                </ListItem>
                                <ListItem alignItems="flex-start">
                                        <ListItemIcon>
                                        <YouTubeIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="YouTube"/>
                                </ListItem>
                                <ListItem alignItems="flex-start">
                                        <ListItemIcon>
                                        <YouTubeIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="YouTube"/>
                                </ListItem>
                                
                            </List>     */}

                        </Grid>
                        <Grid item lg={8} md={8} xs={12}>
                            <Tabs value={tabVal} onChange={handleTabs}>
                                <Tab label="About"></Tab>
                                <Tab label="Timeline"></Tab>
                            </Tabs>
                            <TabPanel value={tabVal} index={0}>
                            <Grid container>
                                <Table style={{border: "none"}}>
                                    <TableBody>
                                        {/* <TableRow  style={{border: "none"}}>
                                            <TableCell>User Id</TableCell>
                                            <TableCell>enfkn</TableCell>
                                        </TableRow> */}
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>{userData.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Email</TableCell>
                                            <TableCell>{userData.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>{userData.phone}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Profession</TableCell>
                                            <TableCell>{userData.work}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                            </TabPanel>
                            <TabPanel value={tabVal} index={1}>
                            <Grid container>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Experience</TableCell>
                                            <TableCell>enfkn</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Hourly Rate</TableCell>
                                            <TableCell>enfkn</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total Projects</TableCell>
                                            <TableCell>enfkn</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>English Level</TableCell>
                                            <TableCell>enfkn</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Availability</TableCell>
                                            <TableCell>enfkn</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                            </TabPanel>
                        </Grid>
                    </Grid>
               </Paper>
           </Grid> 
           <Grid container lg={2} md={2} xs={1}></Grid>
        </>
    )
}

export default About
