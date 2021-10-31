import React, {useState, useEffect} from 'react'
import bg from '../images/bg.jpeg';
import bg2 from '../images/bg2.jpg';
import {Grid, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme)=>({
    // root: {
    //     width: "100%",
    //     height: "91vh",
    //     backgroundImage: `url(${bg2})`,
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    // },
    username: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
    },
}))

function Home() {

    const [username, setUserName] = useState('');
    const [show, setShow] =  useState(false);

    // get user data
    const getHomePage = async () => {
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
            setUserName(data.name);
            setShow(true);
        } catch(e){
            console.log(e);
        }
    }


    useEffect(() => {
    getHomePage();
    }, [])



    const classes = useStyles();
    return (
        <>
            <Grid className={classes.root}>
                <Typography variant="h2" className={classes.username} align="center" color="secondary">
                Hello, {show ?  username : "Developers"}</Typography>
            </Grid>
        </>
    )
}

export default Home
