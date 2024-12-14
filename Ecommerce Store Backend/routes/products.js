import express from 'express';  // Import express for routing
import { getProducts, getSingleProduct } from '../controllers/products.js';  // Import controller functions

const router = express.Router();  // Initialize the router

// Route to get all products
router.get('/', getProducts);

// Route to get a single product by ID
router.get('/:id', getSingleProduct);

export default router;  // Export the router for use in the main app