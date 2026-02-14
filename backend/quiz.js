const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

// CREATE QUIZ
router.post("/create-quiz", async (req,res)=>{
  const quiz = new Quiz(req.body);
  await quiz.save();
  res.json({ message:"Quiz created", quiz });
});

// ADD QUESTION
router.post("/add-question", async (req,res)=>{
  const question = new Question(req.body);
  await question.save();
  res.json({ message:"Question added" });
});

// GET QUESTIONS BY QUIZ
router.get("/quiz/:id", async (req,res)=>{
  const questions = await Question.find({ quizId:req.params.id });
  res.json(questions);
});

// SUBMIT QUIZ
router.post("/submit-quiz", async (req,res)=>{
  const { quizId, answers } = req.body;

  const questions = await Question.find({ quizId });

  let score = 0;
  questions.forEach(q=>{
    if(answers[q._id] === q.correctAnswer){
      score++;
    }
  });

  res.json({ score });
});

module.exports = router;