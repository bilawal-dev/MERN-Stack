import mongoose from "mongoose";

function connectDB(){
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/PostsDB');
    } catch (error) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;