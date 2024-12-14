import mongoose from "mongoose";  // Import mongoose to define the schema and interact with MongoDB

// Define a schema for the product model
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name Must Be Provided'],  // Ensure name is required
    },
    price: {
        type: Number,
        required: [true, 'Price Must Be Provided'],  // Ensure price is required
    },
    company: {
        type: String,
        enum: {
            values: ['apple', 'samsung', 'itel', 'redmi'],  // Limit the companies to these values
            message: `{VALUE} is not supported`  // Error message if company is not one of the values
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()  // Automatically set the creation date
    }
})

// Create a model from the schema to interact with MongoDB
const Product = mongoose.model('Product', ProductSchema);

export default Product;  // Export the Product model