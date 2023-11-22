const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

//Get all products
const getProducts = asyncHandler(async(req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        // console.log(error.message)
        // res.status(500).json({message: error.message})
        res.status(500);
        throw new Error(error.message);
    }
});

//Get single product
const getProduct = asyncHandler(async(req, res)=>{
    try {

        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        // res.status(500).json({message: error.message});
        res.status(500);
        throw new Error(error.message);
    }
});

//Create product
const createProduct = asyncHandler(async (req, res)=>{
    // console.log(req.body);
    // res.send(req.body);
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        // console.log(error.message);
        // res.status(500).json({message: error.message});
        res.status(500);
        throw new Error(error.message);
    }
});

const updateProduct = asyncHandler(async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        //We cannot find any product to update
        if(!product){
            // return res.status(404).json({message: `cannot find any product with ID: ${id}`});
            res.status(404);
            throw new Error(`cannot find any product with ID: ${id}`);
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        // res.status(500).json({message: error.message});
        res.status(500);
        throw new Error(error.message);
    }
});

const deleteProduct =  asyncHandler(async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            // return res.status(404).json({message: `cannot find any product with ID: ${id}`});
            res.status(404);
            throw new Error(`cannot find any product with ID: ${id}`);
        }
        res.status(500).json(product);
    } catch (error) {
        // res.status(500).json({message: error.message});
        res.status(500);
        throw new Error(error.message);
    }
});

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}