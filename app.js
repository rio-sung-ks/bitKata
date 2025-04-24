import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Problem from "./models/Problem.js";
async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://riosungks:1Qawsedrf@mongodb-cluster.dqjg6hw.mongodb.net/rio-api?retryWrites=true&w=majority&appName=mongodb-cluster');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}
connectDB();

const problems = await Problem.find();
// console.log(problems);
import express from "express";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import index from "./routes/index.js";
import configPassport from "./config/passport.js";

await connectDB();
const app = express();

app.set("view engine", "ejs",);
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
  secret: "secretkeyGit",
  resave: false,
  saveUninitialized : false,
}));

app.use(passport.initialize());
app.use(passport.session());
//세션에 사용자 정보가 있으면 deserializeUser 호출

configPassport();
app.get("/auth/github", passport.authenticate("github"));


app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res, next) {
    // Successful authentication, redirect home.
    console.log("🟢 req.session :" ,req.session);
    console.log("🟢 req.user :" ,req.user);
    res.redirect("/");
  }
);

app.use("/", index);
app.use("/problems/:id", (req, res, next) => {
  console.log("🟢 req.session in problem :" ,req.session);
  console.log("🟢 req.user in problem:" ,req.user);
  if(!req.user){
    res.redirect("/login");
  }

  const problemId = req.params.id;
  res.render("problemDetail",{
    title: problems[problemId].title,
    completed_users: problems[problemId].completed_users,
    difficulty_level: problems[problemId].difficulty_level,
    description: problems[problemId].description,
    tests: problems[problemId].tests,
  });
});

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
