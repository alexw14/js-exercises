const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersDB = require("./db/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["supersecret"] }));

app.get("/signup", (req, res) => {
  res.send(`
    <div>
      Id is ${req.session.userId}
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign up</button>
      </form>
    </div>
  `);
});

app.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersDB.getOneBy({ email });
  if (existingUser) {
    return res.send("Email already taken");
  }
  if (password !== passwordConfirmation) {
    return res.send("Password do not match");
  }
  const user = await usersDB.create({ email, password });
  req.session.userId = user.id;

  res.send("created");
});

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("Logged out");
});

app.get("/signin", (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
    </div>
  `);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersDB.getOneBy({ email });
  if (!user) {
    return res.send("Email not found");
  }
  const validPassword = await usersDB.comparePasswords(
    user.password,
    password
  );
  if (!validPassword) {
    return res.send("Invalid password");
  }
  req.session.userId = user.id;
  res.send("Logged In!");
});

app.listen(3000, () => {
  console.log("Listening");
});
