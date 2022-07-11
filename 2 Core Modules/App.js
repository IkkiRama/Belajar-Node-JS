const readLine = require("readline");
const fs = require("fs");

// try {
//   // Menulis ke file secara syncronous
//   // fs.writeFileSync("data.txt", "Hello World Secara Asynchronous");

//   // Menulis ke file secara asyncronous
//   fs.writeFile("data.txt", "Hello World Secara Asynchronous", (err) =>
//     err ? console.log(err) : ""
//   );
// } catch (err) {
//   console.log(err);
// }

// Cara membaca file secara synchronous
// const data = fs.readFileSync("data.txt", "utf8");
// console.log(data);
// console.log(data.toString());

// Cara membaca file secara Asynchronous
// fs.readFile("data.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// Memasukan data menggunakan cmd
const { stdin: input, stdout: output } = require("node:process");
const rl = readLine.createInterface({ input, output });

rl.question("Masukkan nama anda : ", (nama) => {
  rl.question("Masukkan noHP anda : ", (noHP) => {
    const contact = { nama, noHP };
    fs.readFile("Contact.json", "utf-8", (err, data) => {
      if (err) throw err;

      const dataJSON = JSON.parse(data);
      dataJSON.push(contact);

      fs.writeFile("Contact.json", JSON.stringify(dataJSON), (err) => {
        if (err) throw err;
        console.log("Data berhasil ditambahkan");
      });
    });
    rl.close();
  });
});
