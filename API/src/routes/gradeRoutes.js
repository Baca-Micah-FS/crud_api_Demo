const express = require("express");
const router = express.Router();
const {
  createGrade,
  getAllGrades,
  getAllGradesById,
  updateGrade,
  deleteGrades,
} = require("../controller/gradeController");

// /api/v1/grades
router.get("/", getAllGrades);
router.get("/:id", getAllGradesById);
router.post("/", createGrade);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrades);

module.exports = router;
