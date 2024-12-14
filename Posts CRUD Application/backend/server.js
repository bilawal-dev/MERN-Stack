import express from 'express';
import cors from 'cors';
import figlet from 'figlet'
import connectDB from './config/dbController.js'
import postsRouter from './routes/postsRouter.js'

connectDB();

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({extended: true  }))

//This Parses Our JSON In String Format To JS Object Form, (POST Request In Which Data Is Coming In JSON Format)
app.use(express.json());

app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
    figlet(`Server Started At Port ${PORT}`, function (err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);
    });
})