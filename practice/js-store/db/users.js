const fs = require("fs");
const crypto = require("crypto");

class UsersDB {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a storage requires a filename");
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8"
      })
    );
  }

  async create(userData) {
    userData.id = this.generateRandomId();
    const records = await this.getAll();
    records.push(userData);
    await this.writeAll(records);
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  generateRandomId() {
    return crypto.randomBytes(4).toString("hex");
  }
}

const test = async () => {
  const userDB = new UsersDB("users.json");

  await userDB.create({ email: "test@test.com", password: "password" });

  const users = await userDB.getAll();
  console.log(users);
};

test();
