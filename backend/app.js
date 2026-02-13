const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/quizDB")
.then(()=> console.log("MongoDB connected"))
.catch(err=> console.log(err));

app.get("/", (req,res)=>{
  res.send("Server running");
});

const quizRoutes = require("./quiz");
app.use("/", quizRoutes);


app.listen(3000, ()=>{
  console.log("Server started");
});
//REGISTER USER
// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = new User({
      name,
      email,
      password,
      role
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error registering user" });
  }
});
// LOGIN USER
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    role: user.role
  });
});