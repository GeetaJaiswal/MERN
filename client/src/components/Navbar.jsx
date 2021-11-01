import React, {useState} from 'react';
import {AppBar, Toolbar, Grid, Button, ListItem, List, Box, IconButton, Hidden, Divider,
    ListItemText, ListItemIcon, SwipeableDrawer} from '@mui/material';
import {makeStyles} from '@material-ui/core';
import logo from '../images/logo.png';
import {NavLink} from 'react-router-dom';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';


const useStyles = makeStyles({
    root: {
        display: "flex",
    },
    sidebar: {
        width: "200px",
    }
})



const Navbar = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <>
        <SwipeableDrawer open={open} onClose={() => setOpen(false)}>
        <Box align="center">
            <img src={logo} alt="logo" width="200px"/>
        </Box>    
            <List  className={classes.sidebar}>
                <Divider/>
                <ListItem component={NavLink} to='/' onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <Divider/>
                <ListItem component={NavLink} to='/about' onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="About" />
                </ListItem>
                <Divider/>
                <ListItem component={NavLink} to='/contact' onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="Contact" />
                </ListItem>
                <Divider/>
                <ListItem component={NavLink} to='/register' onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="Sign up" />
                </ListItem>
                <Divider/>
                <ListItem component={NavLink} to='/login' onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="Login"/>
                </ListItem>
                <Divider/>
                <ListItem component={NavLink} to='/logout' onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>
                </ListItem>
            </List>
        </SwipeableDrawer>

        <Grid item xs={12} lg={12}>
            <AppBar position="sticky" color="secondary">
                <Grid item xs={12} lg={12}>
                    <Hidden smUp>
                        <IconButton flex={1}>
                            <HorizontalSplitIcon style={{color:"white", fontSize:"40px",}} onClick={() => setOpen(true)}/>
                        </IconButton>
                        <img src={logo} alt="logo" width="150px" style={{float:"right", padding:"10px"}}/>
                    </Hidden>

                    <Hidden smDown>
                    <Toolbar className={classes.root}>
                        <Box  flexGrow={1}>
                            <img src={logo} alt="logo" width="150px"/></Box>
                        <Box>
                        <Button color="inherit" component={NavLink} to='/'>Home</Button>
                        <Button color="inherit" component={NavLink} to='/about'>About</Button>
                        <Button color="inherit" component={NavLink} to='/contact'>Contact</Button>
                        <Button color="inherit" component={NavLink} to='/register'>Signup</Button>
                        <Button color="inherit" component={NavLink} to='/login'>Login</Button>
                        <Button color="inherit" component={NavLink} to='/logout'>Logout</Button>
                        </Box>
                    </Toolbar>
                    </Hidden>
                </Grid>    
            </AppBar>  
        </Grid>                  
        </>
    )
}

export default Navbar;
