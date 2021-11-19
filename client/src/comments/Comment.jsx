import { Typography, Box, makeStyles }  from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { deleteComment } from '../services/api';

const useStyles = makeStyles({
    component: {
        backgroundColor: "#f5f5f56b",
        padding: "15px",
        margin: 10,
    },
    container: {
        display: "flex",
        alignContent: "space-between",
        justifyContent: "space-between",
    },
    date: {
        fontSize: 12,
        color: "#b3a5a5",
    },
    comment: {
        fontSize: 14
    },
    remove: {
        fontSize: 16,
        color: "red",
        cursor: "pointer",
    }
})

const Comment = ({comment, setToggle}) => {
    // console.log(comment);
    const classes = useStyles();

    const removeComment = async() => {
        await deleteComment(comment._id);
        setToggle(prev=>!prev);
    }

    return (
        <>
        <Typography variant="h5" color="primary">Comments</Typography>
        <br/>
        <Box className={classes.component}>
            <Box className={classes.container}>
                <Typography className={classes.name}><b>{comment.name}</b></Typography>
                <Typography className={classes.date}>{new Date(comment.date).toDateString()}</Typography>
            </Box>
            <Box className={classes.container}>
                <Typography className={classes.comment}>{comment.comments}</Typography>
                <HighlightOffIcon className={classes.remove} onClick={()=>removeComment()}/>
            </Box>    
        </Box>
        </>
    )
}

export default Comment;