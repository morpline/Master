
const express = require("express");
const db = require("./db/connect");
const app = express();
const Products = require("./routes/products");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const port = process.env.PORT || 3000;

require("dotenv").config()

//middleware

// app.use(express.static("./public"));
app.use(express.json());

//route
// console.log(Products);
app.use("/api/v1/products",Products);

app.get("/", ((req,res) =>{
    res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>'")
}))

app.use(notFound)

app.use(errorHandlerMiddleware);

const start = async() => {
    try{
        await db(process.env.MONGO_URI);
        app.listen(port, console.log(`port is ${port}..`));
        console.log("Conn. to the d.");
    } catch(err){
        console.log("Fail. to the d.");
    }
}
start();