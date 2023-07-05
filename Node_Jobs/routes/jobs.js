const express = require("express");
const router = express.Router();

const jobOb = require("../controllers/jobs");

router.route("/").post(jobOb.createJob).get(jobOb.getAllJobs);
router.route("/:id").get(jobOb.getjob).delete(jobOb.deletejob).patch(jobOb.updatejob);

module.exports = router;