import express from "express";
import cors from "cors";
import figlet from "figlet";
import connectDB from "./config/dbController.js";
import booksRoute from "./routes/booksRoute.js";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import userRoute from "./routes/userRoute.js";
import logoutRoute from "./routes/logoutRoute.js";
import dotenv from 'dotenv';
import authMiddleware from "./middlewares/authMiddleware.js";
import cookieParser from 'cookie-parser';

//For loading up the environment variables:
dotenv.config();

const app = express();

//To make sure cookies are parsed and available in req.cookies:
app.use(cookieParser());

//Option-1: This option allows any origin to access your server, making it open to requests from any domain.
// Configure CORS to allow credentials
const corsOptions = {
    origin: 'http://localhost:5173',  // The frontend URL (replace with your actual frontend URL)
    credentials: true,               // Allow cookies to be included in requests
};

app.use(cors(corsOptions));
//Option-2: This option allows you to specify which origins are permitted to access your server.
// app.use(cors({
    //     origin: 'http://localhost:5173', //Only Clients With This Origin Can Access The Server : 
    //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //     allowedHeaders: ['Content-Type']
    // }))
    

//Middleware For Parsing Request Body :
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.status(200).send('Welcome To The Book-Store App');
})

app.use('/books' , authMiddleware ,booksRoute);

app.use('/register', registerRoute);

app.use('/login', loginRoute);

app.use('/user', authMiddleware, userRoute);

app.use('/logout', logoutRoute);

const PORT = process.env.PORT || 5000;

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