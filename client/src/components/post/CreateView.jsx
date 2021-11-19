import React, {useEffect} from 'react';
import { Box, makeStyles, FormControl, InputBase, TextareaAutosize, Button, InputLabel, Select, 
            MenuItem,} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useState } from "react";
import { createPost, getCreatePage, uploadFile } from "../../services/api";
import { useHistory } from "react-router";

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
    form: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
    },
    textfield: {
        flex: 1,
        margin: "0 30px",
        fontSize: 25,
    },
    textarea: {
        width: "99%",
        marginTop: 30,
        fontSize: 17,
        border: "none",
        '&:focus-visible': {
            border: "none",
            outline: "none",
        }
    },
    category: {
        float: "right",
        width: "150px"
    }
}))


const initialValues = {
    title: '',
    description: '',
    picture: '',
    username: 'Geeta',
    category: 'All',
    createDate: new Date()
}

const CreateView = () => {

    const [post, setPost] = useState(initialValues);
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [open, setOpen] = useState(false);
    const history = useHistory();


    const handleClose = () => {
        setOpen(false);
    };
    
      const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        const getCreate = async() => {
            const res = await getCreatePage();
            console.log(res.status);
            if(res.status===401)
            {
                history.push("/login");
            }
        }
        getCreate();
    })

    useEffect(() => {
        const getFile = async() => {
            console.log(file);
            if(file){
                const data = new FormData();
                console.log(data);
                data.append("name",file.name);
                data.append("file", file);

                const image = await uploadFile(data);
                console.log(image);
                post.picture = image.data;
                setImage(image.data);
            }
        }
        getFile();
    }, [file])


    const handleChange = (e) => {
        setPost({...post, [e.target.name]:e.target.value});
    }

    const savePost = async() => {
        try {
            await createPost(post);
            history.push('/');
        }
        catch(e){
            console.log(`save post error ${e}`);
        }
    }

    const classes = useStyles();
    const url = post.picture || "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

    return (
        <>
        <Box className={classes.container}>
        <form method="POST">
            <img src={url} alt="banner" className={classes.image}/>
            <FormControl className={classes.form}>
                <label htmlFor="fileInput">
                    <AddIcon fontSize="large" color="action" />
                </label>
                <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                <InputBase placeholder="Title" className={classes.textfield} name="title" onChange={(e)=>handleChange(e)}/>
                <Button variant="contained" color="primary" onClick={()=>savePost()}>Publish</Button>
            </FormControl>
            
            <FormControl className={classes.category}>
                <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                >
                <MenuItem value="Music">Music</MenuItem>
                <MenuItem value="Movies">Movies</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Tech">Tech</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                </Select>
            </FormControl>
            <TextareaAutosize aria-label="empty textarea"  minRows={5} placeholder="Write here..." className={classes.textarea} name="description" onChange={(e)=>handleChange(e)}/>
        </form>
        </Box>
        </>
    )
}

export default CreateView;