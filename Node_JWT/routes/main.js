const express = require("express");
const router = express.Router();
const tasks = require("../controllers/main");

const auth = require("../middleware/auth");

router.route("/dashboard").get(auth,tasks.dashboard);
router.route("/login").post(tasks.login);

module.exports = router;