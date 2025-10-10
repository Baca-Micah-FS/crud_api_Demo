const express = require("express");
const router = express.Router();

const studentRoutes = require("./studentRoutes");
const assignmentRoutes = require("./assignmentRoutes");
const gradeRoutes = require("./gradeRoutes");

// using api/v1 route
router.get("/", (request, response) => {
  response.status(200).json({
    message: "using file src/routes/index",
    success: true,
  });
});

router.use("/students", studentRoutes);
router.use("/assignments", assignmentRoutes);
router.use("/grades", gradeRoutes);

module.exports = router;
