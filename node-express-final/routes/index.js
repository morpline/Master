const express = require("express");
const router = express.Router();
const tasks = require("../controllers/");

// const auth = require("../middleware/auth");

router.route("/").get(tasks.getAll);
// router.route("/login").post(tasks.login);

module.exports = router;