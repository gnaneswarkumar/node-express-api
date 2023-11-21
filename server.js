const express = require("express");
const mongoose = require("mongoose");

const Product = require("./models/productModel");

const app = express();

app.use(express.json())

//Routes
app.get("/", (req, res)=>{
    res.send("Hello to first NODE API");
});

app.get("/blog", (req, res)=>{
    res.send("Hulloo blog");
});

app.get("/products/:id", async(req, res)=>{
    try {

        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put("/products/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        //We cannot find any product to update
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID: ${id}`});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Delete product
app.delete("/products/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message: `cannot find any product with ID: ${id}`});
        }
        res.status(500).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


app.get("/products", async(req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.post("/products", async (req, res)=>{
    // console.log(req.body);
    // res.send(req.body);
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});



mongoose.connect("mongodb+srv://admin:admin@gknodeexpressapi.nmlqh9z.mongodb.net/gknodeexpressapi?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(3000, ()=>{
        console.log("Node API app is running on port 3000");
    });
})
.catch((error)=>{console.log(error)});