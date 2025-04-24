import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { title: "username" });
});

router.get(
  "/login",
  (req, res, next) => {
    res.render("indexLogin");
  }

);

function solution(n) {
  let fib = [0, 1];
  for (let i = 2; i <= n; i++) {
      fib[i] = (fib[i-1] + fib[i-2]) % 1234567;
  }
  return fib[n];
}


export default router;