// References:
// https://www.youtube.com/watch?v=9OfL9H6AmhQ
// https://www.youtube.com/watch?v=v_pcW65DGu8

require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
// const userRoute = require("./routes/userRoute");
const errorMiddleware = require("./middleware/errorMiddlware");
const cors = require('cors')
const app = express();

app.use(cors());


const MONGO_URL = process.env.MONGO_URL;
const PORT=process.env.PORT || 3000;

app.use(express.json());
//To accept form posts
app.use(express.urlencoded({extended: false}));

app.use('/api/products', productRoute);
// app.use('/api/users', userRoute);

//Routes
app.get("/", (req, res)=>{
    res.send("Hello to first NODE API");
});

app.get("/blog", (req, res)=>{
    res.send("Hulloo blog");
});

app.use(errorMiddleware);


mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{
        console.log("Node API app is running on port 3000");
    });
})
.catch((error)=>{console.log(error)});