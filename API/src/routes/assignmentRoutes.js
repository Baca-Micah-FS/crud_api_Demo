const express = require("express");
const router = express.Router();
const {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getGradesForAssignment,
} = require("../controller/assignmentController");

// /api/v1/assignments
router.get("/", getAllAssignments);
router.get("/:id", getAssignmentById);
router.get("/:id/grades", getGradesForAssignment);

router.post("/", createAssignment);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

module.exports = router;
