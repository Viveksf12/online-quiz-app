const express=require("express");
const mongoose=require("mongoose");
const User=require("../models/User");

const app=express();
app.use(express());

mongoose.connect("mongodb://127.0.0.1:27017/quizDB")
.then(()=> console.log("MongoDB connected"))
.catch(err=>console.log(err));

app.get("/",(req,res)=>{
    res.send("Server running")
});

app.listen(3000,()=>{
    console.log("Server started")

});