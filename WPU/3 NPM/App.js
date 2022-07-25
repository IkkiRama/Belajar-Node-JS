// var validator = require("validator");
// // console.log(validator.isEmail("rifki@gmail.com"));
// // console.log(validator.isEmail("rifki@gmailcom"));
// // console.log(validator.isEmail("rifki@gmail.c"));

// // console.log(validator.isMobilePhone("081234567890", "id-ID"));
// // console.log(validator.isMobilePhone("0801234567890", "id-ID"));

// // console.log(validator.contains("Aku sayang kamu", "sayang"));
// // console.log(validator.contains("Aku sayang kamu", "anjay"));

// // console.log(validator.isNumeric("12031032"));
// // console.log(validator.isNumeric("12031032aa"));

// // console.log(validator.isLength("Aku sayang kamu", { min: 10, max: 20 }));

// Chalk is a library for displaying colored text in the terminal.
import chalk from "chalk";

const sapa = `${chalk.blue.bgWhiteBright("Hai, ")}${chalk.white.bold(
  "nama saya "
)}${chalk.green.bgCyanBright.inverse(
  "adalah "
)}${chalk.green.bgCyanBright.inverse(
  "Rifki Romadhan"
)}${chalk.white.strikethrough.bgBlue(
  ". Saya sekarang "
)}${chalk.white.italic.bgBlueBright.bold("berusia ")}${chalk.green("17 Tahun")}
`;

console.log(sapa);
console.log(chalk.green("ASU KONTOL"));
