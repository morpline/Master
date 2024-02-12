
const express = require("express");
const db = require("./db/firebase-config");
const app = express();
const tasks = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { collection, getDocs } = require("firebase/firestore");
const port = process.env.PORT || 3000;

require("dotenv").config()

//middleware

app.use(express.static("./public"));
app.use(express.json());

//route

app.use("/api/v1/tasks",tasks);

app.use(notFound)

app.use(errorHandlerMiddleware);

const start = async() => {
    try{
        // await db();
        app.listen(port, console.log(`port is ${port}..`));
        // console.log("Conn. to the d.");
    } catch(err){
        console.log("Fail. to the d.");
    }
}
start();