// beginning of REST API setup

const express = require("express");
const router = express.Router();

// Allows access to student Model "Schema"
// Will build all of our attributes set in the Student Model
const Student = require("../models/student");

// RESTFUL Endpoints
// GET, POST, PUT, DELETE

// Middle Ware
const getStudent = async (req, res, next) => {
  let student;
  try {
    // tells url to use the middleware
    student = await Student.findById(req.params.id);
    if (student === null) {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.student = student;
  next();
};

// GET ALL
router.get("/", async (req, res) => {
  try {
    // tells url to use the middleware
    const students = await Student.find();
    // If there are no students return 404 instead of empty array
    if (students.length === 0)
      return res.status(404).json({ message: "No students to remove" });
    res.json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET BY ID
// getStudent runs middle ware
router.get("/:id", getStudent, async (req, res) => {
  res.json(res.student);
});

// POST CREATE
router.post("/", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    class: req.body.class,
  });
  try {
    // wait(await) for new student model to be saved
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH UPDATE
router.patch("/:id", getStudent, async (req, res) => {
  // if the name in the body is not null then the new name in the body is updated as req.body.name
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.class != null) {
    res.student.class = req.body.class;
  }

  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  //   res.send(`Student ID:${req.params.id}`);
});

//DELETE
router.delete("/:id", getStudent, async (req, res) => {
  try {
    // await res.student.deleteOne();
    // EITHER WORKS
    const deleted = await Student.findByIdAndDelete(req.params.id);
    // if (!deleted) return res.status(404).json({ message: "Student Not Found" });
    res.json({ message: "Removed Student" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  //   res.send(`Student ID:${req.params.id}`);
});

module.exports = router;
