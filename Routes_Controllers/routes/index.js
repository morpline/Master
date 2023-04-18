const myController = require("../controllers");
const routes = require("express").Router();

routes.get("/", myController.awe);
routes.get("/ttech", myController.awee);

module.exports = routes;