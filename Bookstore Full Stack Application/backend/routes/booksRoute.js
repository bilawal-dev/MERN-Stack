import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

//Route To Add A Book : 
router.post('/', async (req, res) => {
    const { title, author, publishYear } = req.body;

    const { email } = req.user;

    if(!title || !author || !publishYear){
        return res.status(400).json({message: 'Error, Incomplete Data Sent From Front-End'});
    }

    try {
        const newBook = {
            email,
            title,
            author,
            publishYear
        };
        
        const book = await Book.create(newBook);
    
        res.status(200).json({book, message: 'Book Added To Store Successfully'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Route To Get All Books : 
router.get('/' , async (req, res) => {
    const { email } = req.user;

    try {
        const books = await Book.find({ email });

        res.status(200).json({books});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Route To Get A Single Book : 
router.get('/:id' , async (req, res) => {
    const { id } = req.params;

    const { email } = req.user;
    
    try {
        const book = await Book.findOne({ _id: id, email });
        res.status(200).json({book});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Route To Update A Book : 
router.put('/:id' , async (req, res) => {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;
    const { email } = req.user;

    if(!title || !author || !publishYear){
        return res.status(400).json({message: 'Error, Incomplete Data Sent From Front-End'});
    }

    const book = {title, author, publishYear};
    
    
    try {
        const updatedBook = await Book.findOneAndUpdate({ email, _id: id } , book, {new: true});

        res.status(200).json({updatedBook}); 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Route To Delete A Book : 
router.delete('/:id' , async (req, res) => {
    const { id } = req.params;

    const { email } = req.user;

    try {
        const deletedBook = await Book.findOneAndDelete({ email, _id: id });

        res.status(200).json({deletedBook});    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router;