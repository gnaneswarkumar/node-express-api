const express = require("express");
const router = express.Router();

const Product = require("../models/productModel");
const {
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/productController")

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/:id", updateProduct);

//Delete product
router.delete("/:id", deleteProduct);

router.post("/", createProduct);

module.exports = router;