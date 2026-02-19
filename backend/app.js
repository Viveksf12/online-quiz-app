const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const path = require("path");

const app = express();

app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

 mongoose.connect("mongodb+srv://viveksf532_db_user:t530JCfLTTTcVvCq@cluster0.ddywtoq.mongodb.net/quizDB?retryWrites=true&w=majority")

// mongoose.connect("mongodb+srv://rajmahato575_db_user:raj12@cluster0.twhu7fy.mongodb.net/?appName=Cluster0")

.then(()=> console.log("MongoDB connected"))
.catch(err=> console.log(err));

const quizRoutes = require("./quiz");
app.use("/api", quizRoutes);

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = "student";

    const user = new User({ name, email, password, role });
    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    role: user.role,
    email: user.email
  });
});

app.listen(3000, ()=>{
  console.log("Server started on port 3000");
});
