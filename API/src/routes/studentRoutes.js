const express = require("express");
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getGradesForStudent,
} = require("../controller/studentController");

// /api/v1/students
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.get("/:id/grades", getGradesForStudent);

router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
