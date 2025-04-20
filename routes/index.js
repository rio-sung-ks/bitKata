import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { title: "바닐라코딩" });
});

export default router;
