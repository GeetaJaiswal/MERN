// const createPost = require("../controller/post-controller");

const express = require("express");
const app = express();
const router = express.Router();
const Post = require("../schema/post-schema");
const upload = require('../utils/upload');
const mongoose = require('mongoose');
const grid = require('gridfs-stream');
const Comment = require('../schema/comment-schema');
const authentication = require('../middleware/authentication');


let gfs ;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

//router.post('/create',createPost);

router.get('/create', authentication, async(req,res) => {
    try {
        console.log(res);
        res.status(200).json();
    }
    catch(e){
        console.log(res);
        console.log(`while getting create page ${e}`);
        res.status(500).json();
    }
})

// creating post
router.post('/create', async (req, res) => {
    try{
        console.log(req.body);
        //const post = await new Post(req.body);
        const { title, description, picture, username, category, createDate } = req.body;
        const blogData = new Post({
            title:title,
            description:description,
            picture:picture,
            username:username,
            category:category,
            createDate:createDate
        });
        
        console.log("user " + blogData);

        const blogCreated = await blogData.save();
        if(blogCreated)
            {
                return res.status(200).json({
                    message: "blog created successfully"
                })
            }

        console.log("post "+post);
        // post.save();
        res.status(200).json({message:'Blog saved'});
    } catch(error){
        res.status(500).json('Blog not saved '+ error)
    }
})


//getting all posts

// router.get('/posts', async(req,res) => {
//     try {
//         let posts = await Post.find({});
//         res.status(200).json(posts);
//     }
//     catch(e) {
//         console.log(`error while getting all the post ${e}`);
//         res.status(500).json(e);
//     }
// })

router.get('/posts', async(req,res) => {
    let username = req.query.username;
    let category = req.query.category;
    let post;
    try {
        const id = req.params.id;
        if(username)
        {
            post = await Post.find({username:username});
        }
        else if(category) {
            post = await Post.find({category:category});
        }
        else
        {
            post = await Post.find({});
        }
        res.status(200).json(post);
    }
    catch(e) {
        console.log(`error while getting all the post ${e}`);
        res.status(500).json(e);
    }
})


// getting post by id
router.get('/post/:id', async(req,res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById({_id:id});
        res.status(200).json(post);
    }
    catch(e) {
        console.log(`error while getting single post ${e}`);
        res.status(500).json(e);
    }
})


//updating post
router.post('/update/:id', async(req,res) => {
    try {
        const id = req.params.id;
        const post = await Post.findByIdAndUpdate({_id:id}, {
            $set: req.body
        })
        res.status(200).json("post updated successfully");
    }
    catch(e) {
        console.log(`error while updating post ${e}`);
        res.status(500).json(e);
    }
})


//delete post
router.delete('/delete/:id', async(req,res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById({_id:id});
        await post.delete();
        res.status(200).json("post deleted successfully");
    }
    catch(e) {
        console.log(`error while deleting post ${e}`);
        res.status(500).json(e);
    }
})


//uploading file
router.post('/file/upload', upload.single('file'), async(req,res) => {
    console.log(req.file);
    try {
        if(!req.file){
            return res.status(404).json("file not found");
        }
        else {
            const imageURL = `http://localhost:8000/file/${req.file.filename}`
            console.log(imageURL);
            res.status(200).json(imageURL);
        }
    }
    catch(e) {
        console.log(`error while uploading file ${e}`);   
        res.status(500).json(e);
    }
})



//fetching image 
router.get('/file/:filename', async(req,res) => {
    try {
        const file = await gfs.files.findOne({filename: req.params.filename});
        // console.log(file);
        const readStream = gfs.createReadStream(file.filename);
        // console.log(readStream);
        readStream.pipe(res);
    }
    catch(e) {
        res.status(500).json(`failed to fetch the image ${e}`);
    }
})


//new comment
router.post('/comment', async(req,res) => {
    try {
        const comment = await new Comment(req.body);
        comment.save();
        res.status(200).json("comment saved successfully");
    }
    catch(e) {
        res.status(500).json(`error while posting new comment ${e}`);
    }
})


//get comment
router.get('/comments/:id', async(req,res) => {
    try {
        const comments = await Comment.find({postId: req.params.id});
        console.log(comments);
        res.status(200).json(comments);
    }
    catch(e) {
        res.status(500).json(`error while geting comments ${e}`);
    }

})



//delete comment
router.delete('/comment/delete/:id', async(req,res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        comment.delete();
        res.status(200).json('comment deleted succesfully');
    }
    catch(e) {
        res.status(500).json(`error while deleting comment ${e}`);
    }

})

module.exports = router;