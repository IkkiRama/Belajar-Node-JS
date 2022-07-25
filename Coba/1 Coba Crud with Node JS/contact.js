import fs from "fs";
import chalk from "chalk";
import validator from "validator";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
}

if (!fs.existsSync("./data/contacts.json"))
  fs.writeFileSync("./data/contacts.json", JSON.stringify([]), "utf-8");

const Pertanyaan = (pertanyaan) => rl.question(pertanyaan);

const errFeed = (message) =>
  console.log(chalk.redBright.bold.bgWhiteBright.inverse(message));

const load = () => fs.readFileSync("./data/contacts.json", "utf-8");

const Validasi = (nama, email, noHp, alamat) => {
  if (nama.trim() == "" || email.trim() == "" || noHp.trim() == "") {
    errFeed("Masukkan semua data dengan benar");
    return false;
  }

  if (!validator.isEmail(email)) {
    errFeed("Harap masukkan email dengan benar");
    return false;
  }

  if (!validator.isMobilePhone(noHp, "id-ID")) {
    errFeed("Harap masukkan no HP dengan benar");
    return false;
  }

  if (alamat) {
    if (!validator.isLength(alamat, { min: 15 })) {
      errFeed("Masukkan minimal 15 huruf dalam Alamat");
      return false;
    }
  }
};

const tambahData = (nama, email, noHp, alamat) => {
  const contact = { nama, email, noHp, alamat };
  fs.readFile("./data/contacts.json", "utf-8", (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);

    // Validasi
    const validasi = Validasi(nama, email, noHp, alamat);
    if (validasi !== false) {
      contacts.push(contact);
      // Menuliskan ke data contacts.json
      fs.writeFileSync(
        "./data/contacts.json",
        JSON.stringify(contacts),
        "utf-8"
      );

      console.log(
        chalk.green.bgBlack.bold.inverse("Data Berhasil Ditambahkan!!")
      );
    }
  });
  rl.close();
};

const findContact = (nama) => {
  const contacts = JSON.parse(load());
  const hasil = contacts.filter((contact) => contact.nama === nama);
  hasil.length === 0
    ? console.log(
        chalk.redBright.bold.bgWhiteBright.inverse(
          `Nama ${nama} tidak ditemukan`
        )
      )
    : console.log(hasil);
  rl.close();
};

const view = () => {
  const contacts = JSON.parse(load());
  console.table(contacts);
  rl.close();
};

const builder = {
  nama: {
    alias: "n",
    type: "string",
    demandOption: true,
    description: "Masukkan nama anda",
  },
  email: {
    alias: "e",
    type: "string",
    demandOption: true,
    description: "Masukkan email anda",
  },
  noHp: {
    alias: "hp",
    type: "string",
    demandOption: true,
    description: "Masukkan No HP anda",
  },
  alamat: {
    alias: "a",
    type: "string",
    description: "Masukkan alamat anda",
  },
};

export { Pertanyaan, tambahData, builder, findContact, view };
