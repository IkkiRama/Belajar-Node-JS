import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import {
  saveContact,
  pertanyaan,
  data,
  view,
  bluePrint,
  remove,
  nama,
  edit,
  detail,
} from "./Contacts.js";

const main = async () => {
  const nama = await pertanyaan("Masukkan nama anda : ");
  const alamat = await pertanyaan("Masukkan email anda : ");
  const telepon = await pertanyaan("Masukkan telepon anda : ");

  saveContact(nama, alamat, telepon);
};

const main2 = async () => {
  bluePrint("add", "Menambahkan Data Baru", data(), (argv) =>
    saveContact(argv.nama, argv.email, argv.noHP, argv.alamat)
  );
  bluePrint("view", "Menampilkan semua nama dan no HP", "", (argv) => view());
  bluePrint("remove", "Menghapus data menggunakan nama", nama(), (argv) =>
    remove(argv.nama)
  );
  bluePrint("edit", "Menampilkan tampilan edit", nama(), (argv) =>
    edit(argv.nama)
  );
  bluePrint("detail", "Menampilkan detail contact", nama(), (argv) =>
    detail(argv.nama)
  );
};

if (yargs(hideBin(process.argv)).argv._.length === 0) {
  main();
} else {
  main2();
  yargs(hideBin(process.argv)).parse();
}
