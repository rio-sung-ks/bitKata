import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  const problems = req.problems
  res.render("index", { problems });
});

router.get("/login", (req, res, next) => {
  res.render("indexLogin");
});

export default router;
