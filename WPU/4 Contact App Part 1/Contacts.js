import fs from "fs";
import readLine from "readline";
import debounce from "debounce";
import { stdin as input, stdout as output } from "node:process";

if (!fs.existsSync("./Data")) {
  fs.mkdirSync("./Data");
}

if (!fs.existsSync("./Data/Contacts.json")) {
  fs.writeFile("./Data/Contacts.json", JSON.stringify([]), (err) => {
    if (err) throw err;
  });
}

// Memasukan data menggunakan cmd
const rl = readLine.createInterface({ input, output });

const pertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama);
    });
  });
};

const saveContact = (nama, alamat, telepon) => {
  const contact = { nama, alamat, telepon };
  fs.readFile("./Data/Contacts.json", "utf-8", (err, data) => {
    if (err) throw err;

    const dataJSON = JSON.parse(data);
    dataJSON.push(contact);

    fs.writeFile("./Data/Contacts.json", JSON.stringify(dataJSON), (err) => {
      if (err) throw err;
      console.log("Data berhasil ditambahkan");
    });
  });

  const values = ["lorem ipsum", "dolor sit amet"];
  const showResults = debounce(() => {
    console.log(
      "\n",
      values.filter((val) => val.startsWith(rl.line)).join(" ")
    );
  }, 300);
  process.stdin.on("keypress", (c, k) => {
    showResults();
  });

  //   rl.close();
};

export { pertanyaan, saveContact };
