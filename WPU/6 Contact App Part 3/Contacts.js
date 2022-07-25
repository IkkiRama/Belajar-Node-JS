import fs from "fs";
import chalk from "chalk";
import yargs from "yargs/yargs";
import readLine from "readline";
import validator from "validator";
import { hideBin } from "yargs/helpers";
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
    rl.question(pertanyaan, (data) => {
      resolve(data);
    });
  });
};

const bluePrint = (command, describe, builder, handler) => {
  yargs(hideBin(process.argv)).command({
    command,
    describe,
    builder,
    handler,
  }).argv;
};

const validasi = (data, childData) =>
  data.find((d) => d.nama === childData || d.email === childData);

const saveContact = (nama, email, noHP, alamat) => {
  const contact = { nama, email, noHP, alamat };
  fs.readFile("./Data/Contacts.json", "utf-8", (err, data) => {
    if (err) throw err;

    const dataJSON = JSON.parse(data);

    // validasi dulu
    if (nama.trim() === "" || noHP.trim() === "") {
      console.log(chalk.red.inverse("Data tidak boleh kosong"));
      return false;
    }

    if (validasi(dataJSON, nama) || validasi(dataJSON, noHP)) {
      let message = chalk.red.inverse.bold.italic(
        `Nama atau no HP ${nama} sudah terdaftar, silahkan gunakan nama atau no HP lain`
      );
      console.log(message);
      return false;
    }

    if (email) {
      if (!validator.isEmail(email)) {
        let message = chalk.red.inverse.bold(`Email ${email} tidak valid`);
        console.log(message);
        return false;
      }
    }

    if (!validator.isMobilePhone(noHP, "id-ID") || noHP.length !== 12) {
      let message = chalk.red.inverse.bold(`No HP ${noHP} tidak valid`);
      console.log(message);
      return false;
    }

    dataJSON.push(contact);

    fs.writeFile("./Data/Contacts.json", JSON.stringify(dataJSON), (err) => {
      if (err) throw err;
      console.log(chalk.green.inverse.bold("Data berhasil ditambahkan"));
    });
  });

  rl.close();
};

const view = () => {
  fs.readFile("./Data/Contacts.json", "utf-8", (err, data) => {
    if (err) throw err;

    const dataJSON = JSON.parse(data);

    dataJSON.length === 0
      ? console.log(chalk.red.inverse("Data Kosong"))
      : console.table(dataJSON);
  });

  rl.close();
};

const remove = (nama) => {
  fs.readFile("./Data/Contacts.json", "utf-8", (err, data) => {
    if (err) throw err;

    if (nama.trim() === "") {
      console.log(chalk.red.inverse("Data tidak boleh kosong"));
      return false;
    }

    const dataJSON = JSON.parse(data);
    const index = dataJSON.findIndex((d) => d.nama === nama);
    if (index === -1) {
      let message = chalk.red.inverse.bold(`Nama ${nama} tidak ditemukan`);
      console.log(message);
      return false;
    }

    dataJSON.splice(index, 1);

    fs.writeFile("./Data/Contacts.json", JSON.stringify(dataJSON), (err) => {
      if (err) throw err;
      console.log(chalk.green.inverse.bold("Data berhasil dihapus"));
    });
  });

  rl.close();
};

const edit = async (nama) => {
  const namaBaru = await pertanyaan("Nama: ");
  const email = await pertanyaan("Email: ");
  const noHP = await pertanyaan("No HP: ");
  const alamat = await pertanyaan("Alamat: ");

  if (namaBaru.trim() === "") {
    console.log(chalk.red.inverse("Data tidak boleh kosong"));
    return false;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      let message = chalk.red.inverse.bold(`Email ${email} tidak valid`);
      console.log(message);
      return false;
    }
  }

  if (!validator.isMobilePhone(noHP, "id-ID") || noHP.length !== 12) {
    let message = chalk.red.inverse.bold(`No HP ${noHP} tidak valid`);
    console.log(message);
    return false;
  }

  const dataJSON = await JSON.parse(fs.readFileSync("./Data/Contacts.json"));
  const index = await dataJSON.findIndex((d) => d.nama === nama);
  if (index === -1) {
    let message = chalk.red.inverse.bold(`Nama ${nama} tidak ditemukan`);
    console.log(message);
    return false;
  }

  await dataJSON.splice(index, 1, { nama: namaBaru, email, noHP, alamat });

  fs.writeFile("./Data/Contacts.json", JSON.stringify(dataJSON), (err) => {
    if (err) throw err;
    console.log(chalk.green.inverse.bold("Data berhasil diubah"));
  });

  rl.close();
};

const detail = (nama) => {
  fs.readFile("./Data/Contacts.json", "utf-8", (err, data) => {
    if (err) throw err;

    const dataJSON = JSON.parse(data);
    const index = dataJSON.findIndex((d) => d.nama === nama);
    if (index === -1) {
      let message = chalk.red.inverse.bold(`Nama ${nama} tidak ditemukan`);
      console.log(message);
      return false;
    }

    console.table(dataJSON[index]);
  });

  rl.close();
};

const nama = () => {
  return {
    nama: {
      alias: "n",
      describe: "Masukkan nama lengkap anda",
      demandOption: true,
      type: "string",
    },
  };
};

const data = () => {
  return {
    nama: {
      alias: "n",
      describe: "Masukkan nama lengkap anda",
      demandOption: true,
      type: "string",
    },
    email: {
      alias: "e",
      describe: "Masukkan email anda",
      type: "string",
    },
    noHP: {
      alias: "HP",
      describe: "Masukkan no HP anda",
      demandOption: true,
      type: "string",
    },
    alamat: {
      alias: "a",
      describe: "Masukkan alamat anda",
      type: "string",
    },
  };
};

export {
  pertanyaan,
  saveContact,
  data,
  view,
  bluePrint,
  remove,
  nama,
  edit,
  detail,
};
