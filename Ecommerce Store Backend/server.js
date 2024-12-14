import express from "express";  // Importing Express for routing and server setup
import figlet from "figlet";  // Importing figlet for displaying a styled message in the console
import dotenv from 'dotenv';  // Importing dotenv to load environment variables
import productsRoute from "./routes/products.js";  // Importing products route to handle product-related requests
import connectDB from "./config/connectToDB.js";  // Importing the function to connect to the MongoDB database
import insertProductsInDB from "./db/insertProductsInDB.js";

const app = express();  // Initialize the Express application

dotenv.config();  // Load environment variables from the .env file

app.use(express.json());  // Middleware to parse incoming JSON data in requests

await connectDB();  // Connect to the MongoDB database

// await insertProductsInDB();

// Route to test the server
app.get('/', (req, res) => {
    res.status(200).json({message : 'Products API'});  // Return a simple message when the root route is accessed
});

// Use the /api/products route for product-related API calls
app.use('/api/products', productsRoute);

const PORT = process.env.PORT || 5000;  // Set the port from environment variables or default to 5000

// Start the server and log a message in a stylized format
app.listen(PORT, () => {
    figlet(`Server Is Running On ${PORT}`, function (err, data) {
        if (err) {
            console.log("Something went wrong...");  // Log error if something goes wrong
            console.dir(err);
            return;
        }
        console.log(data);  // Print the server status message in a stylized way
    });
});