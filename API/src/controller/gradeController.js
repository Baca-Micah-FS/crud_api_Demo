const Grade = require("../models/Grade");
const Student = require("../models/Student");
const Assignment = require("../models/Assignment");

const createGrade = async (request, response) => {
  try {
    const { student, assignment, score } = request.body;
    const [s, a] = await Promise.all([
      Student.findById(student),
      Assignment.findById(assignment),
    ]);
    if (!s) {
      return response
        .status(400)
        .json({ message: "Invalid student", success: false });
    }
    if (!a) {
      return response
        .status(400)
        .json({ message: "Invalid assignment", success: false });
    }

    const grade = await Grade.create({ student, assignment, score });
    const populated = await Grade.findById(grade._id).populate(
      "student assignment"
    );

    response.status(201).json({
      message: `${request.method} create grade successful`,
      success: true,
      data: populated,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllGrades = async (request, response) => {
  try {
    console.log("1");
    const { student, assignment } = request.query;
    const filter = {};
    if (student) filter.student = student;
    if (assignment) filter.assignment = assignment;
    console.log("2");
    const grades = await Grade.find(filter)
      .populate("student")
      .populate("assignment")
      .sort("-createdAt");

    response.status(200).json({
      message: `${request.method} get all grades successful`,
      success: true,
      grades,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllGradesById = async (request, response) => {
  try {
    const grade = await Grade.findById(request.params.id);
    if (!grade) {
      response.status(404).json({
        message: "No Grades found",
        success: false,
      });
    }
    response.status(200).json({
      message: `${request.method} Get all grades by ID succesful`,
      success: true,
      grade,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

// ALL UPDATES WILL TAKE REQ.PARAMS.ID AND REQ.BODY
const updateGrade = async (request, response) => {
  try {
    const grade = Grade.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    }).populate("student assignment");
    if (!grade) {
      response.status(404).json({
        message: "No grades found",
        success: false,
      });
    }
    response.status(200).json({
      message: `${request.method} Grade updated Successfuly`,
      succes: true,
      grade,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, success: false });
  }
};

const deleteGrades = async (request, response) => {
  try {
    const deleted = await Grade.findByIdAndDelete(request.params.id);
    if (!deleted) {
      response.status(404).json({
        message: "No grades to delete",
        success: false,
      });
    }
    response.status(200).json({
      message: `${request.method} Grade deleted successfully`,
      success: true,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  createGrade,
  getAllGrades,
  getAllGradesById,
  updateGrade,
  deleteGrades,
};
