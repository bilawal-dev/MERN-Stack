import express from 'express'; // Importing the Express framework
import figlet from 'figlet'; // Importing the Figlet library for creating ASCII art from text
import dotenv from 'dotenv'; // Importing the dotenv library to manage environment variables
import usersRoute from './routes/users.js'; // Importing the users route
import connectToDb from './db/connectToDB.js'; // Importing the function to connect to the database

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Define the port on which the server will listen
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data in incoming requests
app.use(express.json());

// Connect to the database
await connectToDb();

// Use the users route for requests to /users api-endpoint
app.use('/api/users', usersRoute);

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Hello From Home Page');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    figlet(`Server Started At Port ${PORT}`, function (err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);
    });
});