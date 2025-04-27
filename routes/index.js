import express from "express";
import Problem from "../models/Problem.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const problems =  await Problem.find();
  res.render("index", { problems });
});

router.get("/login", (req, res, next) => {
  res.render("indexLogin");
});

export default router;
