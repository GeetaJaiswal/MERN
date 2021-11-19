import React, {useEffect}  from "react";
import { Box, makeStyles, Typography} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link, useHistory} from 'react-router-dom';
import { useState } from "react";
import { getPost, deletePost } from "../../services/api";
// import {EditIcon,DeleteIcon} from '@material-ui/icons';
import Comments from "../../comments/Comments";


const useStyles = makeStyles((theme) => ({
    container: {
        padding: "0 50px",
        [theme.breakpoints.down('md')]: {
            padding: 0,
        }
    },
    image: {
        width: "100%",
        height: "50vh",
        objectFit: "cover",
    }, 
    icons: {
        float: "right",
    },
    icon: {
        margin: 5,
        border: "1px solid #d3cede",
        padding: 7,
        borderRadius: 7,
    },
    heading: {
        fontSize: 38,
        textAlign: "center",
        fontWeight: 600,
        margin: 50,
        wordBreak: 'break-word',
        [theme.breakpoints.down('md')]: {
            fontSize: 28,
            margin: 0,
            padding: "70px 10px 20px 10px",
        }
    },
    subHeading: {
        color: "#878787",
        display: "flex",
        margin: "20px 0",
        [theme.breakpoints.down('md')]: {
            display: "block",
            margin: "20px 15px",
            
        }
    },
    para: {
        wordBreak: 'break-word',
        [theme.breakpoints.down('md')]: {
            padding: "0 12px",
        }
    },
    usernameLink: {
        textDecoration: "none",
        color: "inherit",
    }
}))


const DetailView = ({match}) => {

    const [post, setPost] = useState({});
    const history = useHistory();

    useEffect(() => {
        const fetchData = async() => {
            let data = await getPost(match.params.id);
            console.log("here us "+data);
            setPost(data);
        }
        fetchData();
    }, [])

    const deleteBlog = async() => {
        try
        {
            await deletePost(post._id);
            history.push('/');

        }
        catch(e) {
            console.log(`while deleting ${e}`);
        }
    }


    const classes = useStyles();
    const url = post.picture || "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    return (
        <>
        <Box className={classes.container}>
            <img src={url} alt="banner" className={classes.image}/>
            <Box className={classes.icons}>
                <Link to={`/update/${post._id}`}>
                    <EditIcon className={classes.icon} color="primary"/>
                </Link>    
                <a href="#"><DeleteIcon className={classes.icon} color="error" onClick={()=>deleteBlog()}/></a>
            </Box>
            <Typography className={classes.heading}>{post.title}</Typography>
            <Box className={classes.subHeading}>
                <Link to={`/?username=${post.username}`} className={classes.usernameLink}>
                    <Typography>Author: <span style={{fontWeight:600}}>{post.username}</span></Typography>
                </Link>    
                <Typography style={{marginLeft: "auto"}}>{new Date(post.createDate).toDateString()}</Typography>
            </Box>
            <Typography className={classes.para}>{post.description}</Typography>

            <Comments post={post}/>
        </Box>
        </>
    )
}

export default DetailView;