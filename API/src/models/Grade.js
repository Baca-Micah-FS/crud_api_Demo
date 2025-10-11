const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },

    score: {
      type: Number,
      required: true,
      trim: true,
      min: [0, "Score cannot be negative"],
      max: [100, "Score cannot exceed 100"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grade", gradeSchema);
