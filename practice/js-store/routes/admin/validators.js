const { check } = require("express-validator");
const usersDB = require("../../db/users");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async email => {
      const existingUser = await usersDB.getOneBy({ email });
      console.log(existingUser);
      if (existingUser) {
        console.log("in If statement");
        throw new Error("Email already taken");
      }
    }),

  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),

  requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters")
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("Password do not match");
      }
    }),

  requireEmailExists: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom(async email => {
      const user = await usersDB.getOneBy({ email });
      if (!user) {
        throw new Error("Email not found");
      }
    }),

  requireValidPassword: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersDB.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error("Invalid password");
      }
      const validPassword = await usersDB.comparePasswords(
        user.password,
        password
      );
      if (!validPassword) {
        throw new Error("Invalid password");
      }
    }),

  requireTitle: check("title")
    .trim()
    .isLength({ min: 5, max: 40 }),

  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
};
