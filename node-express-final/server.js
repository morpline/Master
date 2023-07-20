const express = require("express");
const db = require("./db/connect");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/app", require("./routes"));
app.use(express.static("./public"));

const start = async() => {
    try{
        // await db(process.env.MONGO_URI);
        app.listen(PORT, console.log(`port is ${PORT}..`));
        console.log("Conn. to the d.");
    } catch(err){
        console.error("Fail. to the d.");
    }
}
start();