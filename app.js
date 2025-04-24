import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Problem from "./models/Problem.js";
import vm from "vm";
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECT);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}
connectDB();

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

await connectDB();
const app = express();
app.use(express.urlencoded({ extended: true}));
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
    res.redirect("/");
  }
);

app.use("/", index);
app.use("/problems", index);
app.get("/problems/:id", (req, res, next) => {
  if(!req.user){
    return res.redirect("/login");
  }
  let problemId = parseInt(req.params.id);
  res.render("problemDetail",{
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
  console.log(`noTest : ${noTest}`);
  // const arg = problems[proId].tests[proId].code;
  // const answer =  problems[proId].tests[proId].solution;
  
  console.log("proId : ", proId); // 0
  console.log("codeText : ", codeText); // function
  // console.log("function call : ", arg);  // solution(3)
  // console.log("return value : ", answer);  // 2
  
  try {
    for (let i = 0; i < noTest.length; i++) {
      let arg = problems[proId].tests[i].code;
      let answer = problems[proId].tests[i].solution;
      // console.log("function call : ", arg);  // solution(3)
      // console.log("return value : ", answer);  // 2
      const context = {};
      vm.createContext(context);
      vm.runInContext(codeText,context);
      const result = vm.runInContext(arg,context);

      if(result === answer){
        return res.send("success");
      } else {
        return res.send("failure");
      }
    }
    
    // console.log(`result : ${result}`);
    // console.log(`result : ${answer}`)

  } catch (error) {
    res.send("failure");

  }
})

// function solution(n) {
//   let fib = [0, 1];
//   for (let i = 2; i <= n; i++) {
//       fib[i] = (fib[i-1] + fib[i-2]) % 1234567;
//   }
//   return fib[n];
// }

//하샤드
// function solution(x) {
//   let sum = 0;
//   let arr = String(x).split("");
//   for(let i = 0; i < arr.length; i++){
//       sum += Number(arr[i]);
//   }
//   return (x % sum == 0) ? true : false;
// }


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
