// Easy Debug Library
const L = require("../../L.js/L");
L.debug = true;

// const Product = require("../models/product");
// ^^ This file does not exist yet

const getAll = async (req,res)=>{
    L.ld("working");
    const newQuery = req.query;
    L.ld(req.query);
    
    res.status(200).json({response: "Recieved"});
    L.ld("got it");
};

module.exports = {getAll};