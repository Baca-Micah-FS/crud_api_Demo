const Student = require("../models/Student");
const Grade = require("../models/Grade");

const createStudent = async (request, response) => {
  try {
    const student = await Student.create(request.body);
    response.status(201).json({
      message: `${request.method} created student`,
      sucess: true,
      data: student,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllStudents = async (request, response) => {
  try {
    const students = await Student.find().sort("name");
    response.status(200).json({
      message: `${request.method} get all students successful`,
      success: true,
      students,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getStudentById = async (request, response) => {
  try {
    const student = await Student.findById(request.params.id);
    if (!student) {
      return response.status(404).json({
        message: "No student found",
        success: false,
      });
    }
    response.status(200).json({
      message: `${request.method} student found by ID`,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const updateStudent = async (request, response) => {
  try {
    const student = await Student.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return response.status(404).json({
        message: "Student not found",
        success: false,
      });
    }
    response.status(200).json({
      message: `${request.method} updated student`,
      success: true,
      student,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteStudent = async (request, response) => {
  try {
    const deleted = await Student.findByIdAndDelete(request.params.id);
    if (!deleted) {
      return response.status(404).json({
        message: "No student found to delete",
        success: false,
      });
    }
    response.status(200).json({
      message: `${request.method} student deleted`,
      success: true,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getGradesForStudent = async (request, response) => {
  try {
    const grades = await Grade.find({ student: request.params.id })
      .populate({ path: "assignment" })
      .populate({ path: "student" });
    response.status(200).json({
      message: `${request.method} get student grades found`,
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

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudent,
  getGradesForStudent,
};
