const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "Title must be atleast 2 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxLength: [1000, "Descriptino cant be longer than 1000 characters"],
    },

    dueDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
