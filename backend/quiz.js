const express = require("express");
const router = express.Router();

const Quiz = require("../models/quiz");
const Question = require("../models/question");

// CREATE QUIZ
router.post("/create-quiz", async (req, res) => {
  try {
    const { title, duration, createdBy } = req.body;

    const quiz = new Quiz({ title, duration, createdBy });
    await quiz.save();

    res.json({ message: "Quiz created", quiz });
  } catch (err) {
    res.status(500).json({ message: "Error creating quiz" });
  }
});

// ADD QUESTION
router.post("/add-question", async (req, res) => {
  try {
    const { quizId, question, options, correctAnswer } = req.body;

    const q = new Question({
      quizId,
      question,
      options,
      correctAnswer
    });

    await q.save();
    res.json({ message: "Question added" });
  } catch (err) {
    res.status(500).json({ message: "Error adding question" });
  }
});

// GET ALL QUIZZES
router.get("/quizzes", async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

// GET QUESTIONS OF QUIZ
router.get("/quiz/:id", async (req, res) => {
  const questions = await Question.find({ quizId: req.params.id });
  res.json(questions);
});

module.exports = router;
