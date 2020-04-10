const fs = require("fs");
const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

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

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find(record => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter(record => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, userData) {
    const records = await this.getAll();
    const record = records.find(record => record.id === id);
    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }
    Object.assign(record, userData);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();
    for (let record of records) {
      let found = true;
      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
  }

  generateRandomId() {
    return crypto.randomBytes(4).toString("hex");
  }
}

module.exports = new UsersDB("users.json");
