import Product from "../models/productModel.js";  // Import the Product model to interact with the database

// Controller to fetch products based on query parameters
async function getProducts(req, res) {
    const { company, id, name, sort } = req.query;  // Extract query parameters

    // Initialize an empty query object to filter products
    let queryObject = {};

    try {
        // If company is specified, filter by company
        if (company) {
            queryObject.company = company;

            // If sort is specified, return products sorted by price
            if (sort) {
                const products = await Product.find(queryObject).sort({ price: Number(sort) });
                return res.status(200).json({ products });
            }
        }

        // If an ID is provided, exclude that product from the results
        if (id) {
            queryObject._id = { $ne: id };
        }

        // If a name is specified, perform a case-insensitive search
        if (name) {
            queryObject = {};  // Reset query object to only search by name
            //regex is a tool that helps you search, match, or manipulate text based on patterns, not just exact strings. 
            queryObject.name = { $regex: name, $options: 'i' };  // Case-insensitive regex match
        }

        // If sort is specified, return sorted products
        if (sort) {
            const products = await Product.find(queryObject).sort({ price: Number(sort) });
            return res.status(200).json({ products });
        }

        //CASE 1 - IF NO QUERY PARAMETERS THEN FETCHES ALL PRODUCTS:
        //CASE 2 - IF COMPANY AS QUERY, THEN FETCHES ALL PRODUCTS OF THAT COMPANY: 
        //CASE 3 - IF COMPANY AS WELL AS SORT ON BASE OF PRICE (1 FOR ASC, -1 FOR DESC) AS QUERY, THEN FETCHES ALL PRODUCTS OF THAT COMPANY IN SORT: 
        //CASE 4 - IF COMPANY AND ID BOTH AS QUERY PARAMETERS, THEN FETCH PRODUCTS OF COMPANY EXCEPT THAT ID (RELATED PRODUCTS OF A PRODUCT FUNCTIONALITY):
        //CASE 5 - IF NAME IS GIVEN AS QUERY PARAMETERS, THEN SEARCH THAT PRODUCTS WITH NAME (SEARCH FUNCTIONALITY):
        //CASE 6 - IF SORT IF GIVEN, THEN JUST RETURN ALL THE PRODUCTS SORTED (1 FOR ASC, -1 FOR DESC):

        // Fetch products based on the constructed query object
        const products = await Product.find(queryObject);

        // If no products match the query, return a 404 error
        if (!products.length) {
            return res.status(400).json({ message: 'No products found for the specified criteria.' });
        }

        // Return the fetched products
        res.status(200).json({ products });
    } catch (error) {
        // Handle any errors that occur during database query
        res.status(500).json({ message: 'Failed to fetch products: ' + error.message });
    }
}

// Controller to fetch a single product by ID
async function getSingleProduct(req, res) {
    const { id } = req.params;  // Extract product ID from request parameters

    try {
        // Fetch the product by ID
        const product = await Product.findById(id);

        // Return the product if found
        res.status(200).json({ product });
    } catch (error) {
        // Handle any errors that occur during database query
        res.status(500).json({ message: 'Failed To Fetch Product' });
    }
}

export { getProducts, getSingleProduct };  // Export controller functions for use in the routes