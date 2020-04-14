const layout = require("../layout");

const getError = (errors, prop) => {
  // prop === 'email' || 'password' || 'passwordConfirmation'
  try {
    return errors.mapped()[prop].msg;
    // errors.mapped() === { email: {}, password: {}, passwordConfirmation: {} }
  } catch (err) {
    return "";
  }
};

module.exports = ({ req, errors }) => {
  return layout({
    content: `
      <div>
        Id is ${req.session.userId}
        <form method="POST">
          <input name="email" placeholder="email" />
          ${getError(errors, "email")}
          <input name="password" placeholder="password" />
          ${getError(errors, "password")}
          <input name="passwordConfirmation" placeholder="password confirmation" />
          ${getError(errors, "passwordConfirmation")}
          <button>Sign up</button>
        </form>
      </div>
    `
  });
};
