const myController = require("../controllers");
const router = require("express").Router();

const studentController = require("../controllers/index");

router.get("/", studentController.getAllStudents);

router.get("/:id", studentController.getSingleStudent);

router.post("/", myController.createStudent);

router.put("/:id", myController.updateStudent);

router.delete("/:id", myController.deleteStudent);

module.exports = router;
