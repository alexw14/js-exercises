const express = require("express");
const bodyParser = require("body-parser");
const usersDB = require("./db/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign up</button>
      </form>
    </div>
  `);
});

app.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersDB.getOneBy({ email });
  if (existingUser) {
    return res.send("Email already taken");
  }
  if (password !== passwordConfirmation) {
    return res.send("Password do not match")
  }

  res.send("created");
});

app.listen(3000, () => {
  console.log("Listening");
});
