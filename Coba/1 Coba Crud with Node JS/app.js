import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;
import {
  Pertanyaan,
  tambahData,
  builder,
  findContact,
  view,
} from "./contact.js";

const yarg = yargs(hideBin(process.argv));

const main = async () => {
  const nama = await Pertanyaan("Masukkan nama anda : ");
  const email = await Pertanyaan("Masukkan email anda : ");
  const noHp = await Pertanyaan("Masukkan no Hp anda : ");

  tambahData(nama, email, noHp);
};

yarg.command({
  command: "add",
  describe: "Menambahkan kontak baru",
  builder,
  handler(argv) {
    const { nama, email, noHp, alamat } = argv;
    tambahData(nama, email, noHp, alamat);
  },
}).argv;

yarg.command({
  command: "find",
  describe: "Menampilkan contact berdasarkan nama",
  builder: {
    nama: builder.nama,
  },
  handler(argv) {
    findContact(argv.nama);
  },
}).argv;

yarg.command({
  command: "view",
  describe: "Menampilkan semua contact",
  handler(argv) {
    view();
  },
}).argv;

// Cek help
// node app --help
yarg.argv._.length !== 0 ? yarg.parse() : main();
