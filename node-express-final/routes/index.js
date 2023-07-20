const express = require("express");
const router = express.Router();
const tasks = require("../controllers/");
const game = require("../controllers/game");

// const auth = require("../middleware/auth");

router.route("/app").all(tasks.getAll);
router.route("/signing").post(tasks.signin);
router.route("/game/tic").post(tasks.Input).get(tasks.GetGame);
router.route("/game/tic/join").post(tasks.joinGame);
router.route("/game/tic/new").post(tasks.CreateGame);
// router.route("/login").post(tasks.login);

module.exports = router;