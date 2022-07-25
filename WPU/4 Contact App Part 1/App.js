import { saveContact, pertanyaan } from "./Contacts.js";

const main = async () => {
  const nama = await pertanyaan("Masukkan nama anda : ");
  const alamat = await pertanyaan("Masukkan alamat anda : ");
  const telepon = await pertanyaan("Masukkan telepon anda : ");

  saveContact(nama, alamat, telepon);
};

main();

// const main = async () => {
//   const nama = await pertanyaan("Nama: ");
//   const alamat = await pertanyaan("Alamat: ");
//   const telepon = await pertanyaan("Telepon: ");
//   const data = `${nama},${alamat},${telepon}`;
//   fs.writeFileSync("data.csv", data);
//   console.log("Data berhasil ditambahkan");
//   rl.close();
// };
