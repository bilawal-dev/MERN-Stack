import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Username Is Must']
    },
    content: {
        type: String,
        require: [true, 'Content Is Must']
    }
})

const Post = mongoose.model('Posts', postSchema);

export default Post;