const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    },
    comments: {
        type: String,
        required: true,
    }
})

const Comment = new mongoose.model('comments', commentSchema);

module.exports = Comment;