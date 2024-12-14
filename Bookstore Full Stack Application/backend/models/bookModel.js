import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishYear: {
        type: String,
        required: true
    }
})

const Book = mongoose.model('BookModel', bookSchema);

export default Book;