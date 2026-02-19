const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Result = require("../models/Result");


// ===============================
// ADD QUESTION
// ===============================
router.post("/add-question", async (req,res)=>{

  try {

    const { section, question, options, correctAnswer } = req.body;

    const newQuestion = new Question({
      section,
      question,
      options,
      correctAnswer
    });

    await newQuestion.save();

    res.json({ message:"Question added successfully" });

  } catch (error) {
    res.status(500).json({ message:"Error adding question" });
  }

});


// ===============================
// GET QUESTIONS BY SECTION
// ===============================
router.get("/quiz/section/:section", async (req,res)=>{

  try {

    const section = req.params.section;

    const questions = await Question.find({ section });

    res.json(questions);

  } catch (error) {
    res.status(500).json({ message:"Error fetching questions" });
  }

});


// ===============================
// SUBMIT QUIZ
// ===============================
// ===============================
// SUBMIT QUIZ
// ===============================
router.post("/submit-quiz", async (req,res)=>{

  try {

    const { section, answers, userEmail } = req.body;

    const questions = await Question.find({ section });

    let score = 0;

    questions.forEach(q => {
      if (answers[q._id] === q.correctAnswer) {
        score++;
      }
    });

    // ✅ SAVE RESULT IN DATABASE
    const newResult = new Result({
      userEmail,
      section,
      score,
      total: questions.length
    });

    await newResult.save();

    res.json({
      score: score,
      total: questions.length
    });

  } catch (error) {
    res.status(500).json({ message:"Error submitting quiz" });
  }

});

// ===============================
// GET RESULTS BY USER
// ===============================
router.get("/results/:email", async (req,res)=>{

  try {

    const results = await Result.find({ userEmail: req.params.email });

    res.json(results);

  } catch (error) {
    res.status(500).json({ message:"Error fetching results" });
  }

});


module.exports = router;