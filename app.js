import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Problem from "./models/Problem.js";
import vm from "vm";
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECT);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
await connectDB();

const problems = await Problem.find();
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
import { error } from "console";

await connectDB();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secretkeyGit",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

configPassport();
app.get("/auth/github", passport.authenticate("github"));
app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res, next) {
    res.redirect("/");
  }
);

app.use("/", index);
app.use("/problems", index);
app.get("/problems/:id", (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  let problemId = parseInt(req.params.id);
  res.render("problemDetail", {
    title: problems[problemId].title,
    completed_users: problems[problemId].completed_users,
    difficulty_level: problems[problemId].difficulty_level,
    description: problems[problemId].description,
    tests: problems[problemId].tests,
    problemId: problemId,
  });
});

app.post("/problems/:id", (req, res) => {
  const proId = req.body.problemId;
  const codeText = req.body.code;
  let noTest = problems[proId].tests;
  const failArray = [];
  const argArray = [];
  const errorArray = [];
  let inputArg;
  for (let i = 0; i < noTest.length; i++) {
    try {
      let arg = problems[proId].tests[i].code;
      let pStart = arg.indexOf("(", 0) + 1;
      let pEnd = arg.indexOf(")", 0);
      inputArg = arg.substring(pStart, pEnd);
      let answer = problems[proId].tests[i].solution;
      const context = {};
      vm.createContext(context);
      vm.runInContext(codeText, context);
      const result = vm.runInContext(arg, context);

      if (result !== answer) {
        failArray.push(i);
        argArray.push(inputArg);
      }
    } catch (error) {
      failArray.push(i);
      argArray.push(inputArg);
      errorArray.push(error);
    }
  }
  if (failArray.length === 0) {
    res.render("success");
  } else {
    res.render("failure", {
      failArray: failArray,
      argArray: argArray,
      proId: proId,
      problems: problems,
      errorArray: errorArray,
    });
  }
});

app.get("/500", (req, res, next) => {
  const err = new Error("500 ERROR");
  err.status = 500;
  next(err);
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

  if (err.status === 404) {
    return res.render("error");
  } else if (err.status === 500) {
    res.locals.error = {};
    return res.render("error");
  } else {
    return res.render("error");
  }
});

export default app;
