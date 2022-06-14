const express = require("express");
const passport = require("passport");
const { signIn } = require("../auth/jsonwebtoken");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

//POST REGISTER

userRouter.post("/register", (req, res, next) => {
  const callback = (error, user) => {
    if (error) {
      console.log("Error entering callback", error);
      return next(error);
    }
  };
  passport.authenticate("register", callback)(req);
});

//POST LOGIN

userRouter.post("/login", (req, res, next) => {
  const callback = (error, user) => {
    if (error) {
      return next(error);
    }

    const token = signIn(user, req.app.get("jwt-secret"));
    return res.status(200).json({ userId: _id, token });
  };
  passport.authenticate("login", callback)(req);
});

//LOGOUT

userRouter.post("/logout", [isAuthenticated], (req, res, next) => {
  if (!req.authotity) {
    return res.sendStatus(304);
    res.status(304).send();
  }
  return res.status(200).json("Closed user session");
});

module.exports = userRouter;
