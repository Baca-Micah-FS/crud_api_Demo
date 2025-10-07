const mongoose = require("mongoose");

const studentScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  class: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    required: true,
    //Date.now shows exact time created.. Is it the same as timestamps: true??
    default: Date.now,
  },
});

module.exports = mongoose.model("student", studentScheme);
