import express from "express";
import passport from 'passport';

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { title: "바닐라코딩" });
});


router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

export default router;
