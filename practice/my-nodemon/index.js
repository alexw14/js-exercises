#!/usr/bin/env node

const debounce = require("lodash.debounce");
const chokidar = require("chokidar");
const program = require("caporal");

program
  .version("1.0.0")
  .argument("[filename]", "Name of a file to execute")
  .action(args => {
    console.log(args);
  });

program.parse(process.argv);


// const start = () => {};

// chokidar
//   .watch(".")
//   .on("add", () => console.log("added"))
//   .on("change", () => console.log("changed"))
//   .on("unlink", () => console.log("unlinked"));
