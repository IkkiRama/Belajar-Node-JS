import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { saveContact, pertanyaan, data, view } from "./Contacts.js";

const main = async () => {
  const nama = await pertanyaan("Masukkan nama anda : ");
  const alamat = await pertanyaan("Masukkan alamat anda : ");
  const telepon = await pertanyaan("Masukkan telepon anda : ");

  saveContact(nama, alamat, telepon);
};

// yarg.command(
//   "add",
//   "Menambahkan Data Baru",
//   () => {},
//   (argv) => {
//     console.log(argv.nama);
//   }
// ).argv;

yargs(hideBin(process.argv)).command({
  command: "add",
  describe: "Menambahkan Data Baru",
  builder: data(),
  handler(argv) {
    saveContact(argv.nama, argv.email, argv.noHP, argv.alamat);
  },
}).argv;

yargs(hideBin(process.argv)).command({
  command: "view",
  describe: "Menampilkan semua nama dan no HP",
  handler(argv) {
    view();
  },
}).argv;

yargs(hideBin(process.argv)).command({
  command: "remove",
  describe: "Menghapus data menggunakan nama",
  handler(argv) {
    remove();
  },
}).argv;

yargs(hideBin(process.argv)).argv._.length === 0
  ? main()
  : yargs(hideBin(process.argv)).parse();
