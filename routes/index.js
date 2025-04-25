import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { title: "username" });
});

router.get("/login", (req, res, next) => {
  res.render("indexLogin");
});

export default router;
