const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: String,
  duration: Number,
  createdBy: String
});

module.exports = mongoose.model("Quiz", quizSchema);
