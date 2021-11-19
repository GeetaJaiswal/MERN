const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: false,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
})

const post = new mongoose.model('post', postSchema);

module.exports = post;