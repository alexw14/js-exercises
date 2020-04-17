const { validationResult } = require("express-validator");

module.exports = {
  handleErrors(templateFn) {
    return (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send(templateFn({ errors }));
      }
      next();
    };
  }
};
