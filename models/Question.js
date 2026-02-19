const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  section: String,          // 👈 ADD THIS
  question: String,
  options: [String],
  correctAnswer: String
});

module.exports = mongoose.model("Question", questionSchema);
