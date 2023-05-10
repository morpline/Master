const L = require("../../L.js/L");
L.debug=true;

const Product = require("../models/product");

const getProducts = async (req,res)=>{
    L.ld("working");
    const newQuery = req.query;
    L.ld(req.query);
    const queryObject = {
        // newQuery.featured,
    };

    if(newQuery.featured) {
        queryObject.featured = L.lcd(newQuery.featured === "true" ? true : false,"featured: ");
    }
    const companies = ["ikea","liddy","caressa","marcos"];
    if(newQuery.company) {
        queryObject.company = L.lcd(companies.includes(newQuery.company)?newQuery:null,"company: ");
    }
    if(newQuery.name) {
        queryObject.name = L.lcd({ $regex: newQuery.name, $options: 'i'},"Name: ");
    }
    if(newQuery.numericFilters) {
        const operatorMap = {
            ">":"$gt",
            ">=":"$gte",
            "=":"$eq",
            "<":"$lt",
            "<=":"$lte"
        };
        const regex = /\b(<|>|>=|=|<|<=|)\b/g;
        let filters = newQuery.numericFilters.replace(regex,(match)=>`-${operatorMap[match]}-`);
        const options = ["price","rating"];
        filters = filters.split(",").forEach((item)=>{
            const [field,operator,value] = item.split("-");
            if(options.includes(field)){
                queryObject[field] = { [operator]:Number(value)};
            }
        })
    }
    let result = Product.find(queryObject);
    const products = await result;
    if(newQuery.sort) {
        const sortList = newQuery.sort.split(",").join(" ");
        result = result.sort(L.lcd(sortList,"sorting: "));
    } else {
        result = result.sort(L.lcd("featured","sorting: "));
    }

    if(newQuery.fields) {
        const fieldilst = newQuery.fields.split(",").join(" ");
        result = result.select(L.lcd(fieldilst,"select:"));
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page -1) * limit;
    result = result.skip(L.lcd(skip,"skip: ")).limit(L.lcd(limit,"limit: "));
    // L.l(result);
    res.status(200).json({Products: products});
    
};

module.exports = {getProducts};