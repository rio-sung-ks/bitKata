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
// mongodb+srv://riosungks:1Qawsedrf@mongodb-cluster.dqjg6hw.mongodb.net/rio-api?retryWrites=true&w=majority&appName=mongodb-cluster
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

connectDB();
const app = express();

app.set("view engine", "ejs",);
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));



// initialize => serialize => authenticate
//사용자가 로그인 양식을 제출하면 /login으로 POST 요청이 전송되어 설정한 passport.authenticate 미들웨어가 실행됩니다.
// Passport는 req.body.username 및 req.body.password를 가져와 로컬 전략의 확인 함수에 전달합니다.
// 데이터베이스에서 사용자를 로드하고 주어진 비밀번호가 데이터베이스에 있는 비밀번호와 일치하는지 확인하는 작업을 수행합니다.

//사용자를 찾을 수 없거나 비밀번호가 확인되지 않으면 done(null, false)를 호출합니다.
// 모든 것이 정상적으로 진행되어 사용자가 로그인하기를 원하면 done(null, user)를 호출합니다.
// done를 호출하면 흐름이 passport.authenticate로 다시 이동합니다. 여기에는 오류, 사용자 및 추가 정보 객체(정의된 경우)가 전달
//사용자가 전달되면 미들웨어는 req.login(요청에 첨부된 패스포트 함수)을 호출합니다.

// TODO: 필요에 따라 세션 및 Passport 관련 설정을 수정해주세요.

app.use(
  session({
  secret: "sampleSecretKey",
  resave: true,
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
    res.redirect("http://localhost:8000/");
  }
);


app.use("/", index);
app.use("/problems/:id", (req, res, next) => {
  const problemId = req.params.id;
  console.log(problemId);
  // console.log(sample[0]);
  res.json(sample_problems[0]);

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
