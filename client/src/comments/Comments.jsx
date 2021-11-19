import React, { useState , useEffect} from 'react';
import { Box, makeStyles, Typography, TextareaAutosize, Button} from "@material-ui/core";
import { getComments, newComment } from '../services/api';
import Comment from './Comment';

const useStyles = makeStyles({
    component: {
        display: "flex",
        margin: "100px 0px",
    },
    image: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
    },
    textarea: {
        width: "100%",
        margin: "0 20px",
        padding: 10,
    },
    button: {
        height: "40px",
    },
    
})


const initialValues = {
    name: '',
    postId: '',
    date: new Date(),
    comments: '',
}

const Comments = ({post}) => {
    const classes = useStyles();
    const img = "https://static.thenounproject.com/png/12017-200.png";

    const [comment, setComment] = useState(initialValues);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    console.log(post);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: post.username,
            postId: post._id,
            comments: e.target.value
        })
    }

    const postComment = async() => {
        await newComment(comment);
        setToggle(prev=>!prev);
        // setComment('');
    }

    useEffect(() => {
        const getData = async() => {
            let response = await getComments(post._id);
            console.log("response");
            console.log(response);
            setComments(response);
        }
        getData();
    }, [post,toggle])

    return (
        <>
            <Box class="container">
                <Box className={classes.component}>
                    <img src={img} alt="img" className={classes.image}/>
                    <TextareaAutosize 
                        className={classes.textarea} 
                        minRows="5" 
                        name="comment" 
                        onChange={(e)=>handleChange(e)}
                    />
                    <Button 
                        variant="contained"
                        color="primary"
                        size="medium"
                        className={classes.button}
                        onClick={()=>postComment()}>Post</Button>
                </Box>
                
                <Box  style={{marginBottom:"50px"}}>
                {
                    comments && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                }
                </Box>
            </Box>
        </>
    )
}

export default Comments;
