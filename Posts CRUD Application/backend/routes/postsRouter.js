import express from 'express';
import Post from '../models/postModel.js';

const router = express.Router();

router.get('/' , async (req, res) => {
    const posts = await Post.find({});

    if(posts){
        res.status(200).json(posts);
    }
    else{
        res.status(400).json({ message: 'No Posts To Display' })
    }
})

router.post('/create' , async (req, res) => {
    const { username, content } = req.body;

    if(!username || !content){
        res.status(400).json({ message: 'Error! Incomplete Data' })
    }

    const createdPost = await Post.create({
        username,
        content
    })

    if(createdPost){
        res.status(200).json({ message: 'Post Sucessfuly Created', createdPost })
    }
    else{
        res.status(500).json({ message: 'Error! Fail To Create Post' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const singlePost = await Post.findById( id )

    if(singlePost){
        res.status(200).json(singlePost);
    }
    else{
        res.status(500).json({ message: `Error! Failed To Find Post With Id ${id}` })
    }
})

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { username, content } = req.body;

    if (username === '' || content === '') {
        return res.status(400).json({ message: 'Incomplete Data' });
    }

    const post = await Post.findByIdAndUpdate(id, { username, content }, { new: true });

    return res.json({ message: 'Post updated successfully', post });
});


router.get('/delete/:id' , async (req, res) => {
    const { id } = req.params;
    
    console.log(id);

    const deletedPost = await Post.findByIdAndDelete( id );


    console.log(deletedPost);

    if(deletedPost){
        res.status(200).json({ message: 'Post Sucessfuly Deleted', deletedPost })
    }
    else{
        res.status(500).json({ message: 'Error! Fail To Delete Post' })
    }
})

export default router;