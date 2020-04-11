const express = require("express");
const { check, validationResult } = require("express-validator");
const usersDB = require("../../db/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation
} = require("./validators");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    const { email, password, passwordConfirmation } = req.body;
    const user = await usersDB.create({ email, password });
    req.session.userId = user.id;

    res.send("created");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("Logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate());
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersDB.getOneBy({ email });
  if (!user) {
    return res.send("Email not found");
  }
  const validPassword = await usersDB.comparePasswords(user.password, password);
  if (!validPassword) {
    return res.send("Invalid password");
  }
  req.session.userId = user.id;
  res.send("Logged In!");
});

module.exports = router;
