const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      require: true,
    },

    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    score: {
      type: Number,
      required: true,
      trim: true,
      min: [0, "Score cannot be negative"],
      max: ["Score cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grade", gradeSchema);
