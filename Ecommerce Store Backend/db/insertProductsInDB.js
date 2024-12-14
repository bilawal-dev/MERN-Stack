import Product from "../models/productModel.js";  // Importing the Product model to interact with the database
import productsJSON from './products.json' assert { type: 'json' };  // Importing products data from a JSON file

// Function to insert products into the database
export default async function insertProductsInDB() {
    try {
        // Create products in the database using the data from the JSON file
        await Product.create(productsJSON);
        console.log('Products added to DB successfully!');
    } catch (error) {
        console.error('Failed To Connect To DB:', error);
    }
}