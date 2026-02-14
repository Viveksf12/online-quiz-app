const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

//mongoose.connect("mongodb://127.0.0.1:27017/quizDB")
mongoose.connect("mongodb+srv://viveksf532_db_user:t530JCfLTTTcVvCq@cluster0.ddywtoq.mongodb.net/quizDB?retryWrites=true&w=majority")
.then(()=> console.log("MongoDB connected"))
.catch(err=> console.log(err));

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend/index.html"));
});

const quizRoutes = require("./quiz");
app.use("/api", quizRoutes);


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

app.listen(3000, ()=>{
  console.log("Server started");
});