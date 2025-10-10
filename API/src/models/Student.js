const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      minLength: [2, "Name must be longer than 2 characters"],
      maxLength: [50, "Name can't be longer than 50 characters"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },

    classLevel: {
      type: String,
      enum: ["Freshman", "Sophmore", "Junior", "Senior"],
      default: "Freshman",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
