const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const DB = require("./db");

const scrypt = util.promisify(crypto.scrypt);

class UsersDB extends DB {
  async create(userData) {
    // userData  === {email: "", password: ""}
    userData.id = this.generateRandomId();
    const salt = crypto.randomBytes(8).toString("hex");
    const hashed = await scrypt(userData.password, salt, 64);
    const records = await this.getAll();
    const record = {
      ...userData,
      password: `${hashed.toString("hex")}.${salt}`
    };
    records.push(record);
    await this.writeAll(records);
    return record;
  }

  async comparePasswords(saved, supplied) {
    // saved -> in database ("hashed.salt")
    const [hashed, salt] = saved.split(".");
    const hashedSupplied = await scrypt(supplied, salt, 64);
    return hashed === hashedSupplied.toString("hex");
  }
}

module.exports = new UsersDB("users.json");
