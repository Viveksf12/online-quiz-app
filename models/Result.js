const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userEmail: String,
  section: String,
  score: Number,
  total: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Result", resultSchema);
