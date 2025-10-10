const Assignment = require("../models/Assignment");
const Grade = require("../models/Grade");

const createAssignment = async (request, response) => {
  try {
    const assignment = await Assignment.create(request.body);
    response.status(200),
      json({
        message: `${request.method} Assignment created successfully`,
        success: true,
        data: assignment,
      });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllAssignments = async (request, response) => {
  try {
    const assignment = await Assignment.find().sort("-createdAt");
    response.status(200).json({
      message: `${request.method} All assignments found`,
      success: true,
      assignment,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getAssignmentById = async (request, response) => {
  try {
    const assignment = await Assignment.findById(request.params.id);
    if (!assignment) {
      return response.status(404).json({
        message: "No assignment found",
        success: false,
      });
    }
    response.status(200).json({
      message: `${request.method} Assignment found`,
      success: true,
      assignment,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      succcess: false,
    });
  }
};

const updateAssignment = async (request, response) => {
  try {
    const assignment = await Student.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );
    if (!assignment) {
      return response.status(404).json({
        message: "No assignment found to update",
        success: false,
      });
    }
    response.status(200).json({
      message: `${request.method} Assignment Updated!`,
      success: true,
      assignment,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
    });
  }
};

const deleteAssignment = async (request, response) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(request.params.id);
    if (!assignment) {
      return response.status(404).json({
        message: "No assignment found to delete",
        success: false,
      });
    }
    response.status(200).json({
      message: `${request.method} Assignment deleted`,
      success: true,
    });
  } catch (error) {
    response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getGradesForAssignment = async (request, response) => {
  try {
    const grades = await Grade.find({ assignment: request.params.id })
      .populate({ path: "assignment" })
      .populate({ path: "student" });
    response.status(200).json({
      message: `${request.method} Grades found for assignment`,
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
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getGradesForAssignment,
};
