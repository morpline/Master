const express = require("express");
const router = express.Router();
const tasks = require("../controllers/products");

router.route("/").get(tasks.getProducts);

module.exports = router;