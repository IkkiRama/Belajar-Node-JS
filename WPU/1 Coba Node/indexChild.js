const cetakNama = (nama) => `Hai, nama saya adalah ${nama}`;
const hoby = "Gaming";

const mahasiswa = {
  nama: "Rifki",
  umur: 20,
  hobi: hoby,
  cetakNama() {
    return `Hai, nama saya adalah ${this.nama} dan saya sekarang berumur ${this.umur} tahun, saya mempunyai hobi ${this.hobi}`;
  },
};

class Orang {
  constructor(nama, umur, hobi) {
    this.nama = nama;
    this.umur = umur;
    this.hobi = hobi;
  }
  cetakNama() {
    return `Hai, nama saya adalah ${this.nama} dan saya sekarang berumur ${this.umur} tahun, saya mempunyai hobi ${this.hobi}`;
  }
}

module.exports = {
  hoby,
  cetakNama,
  mahasiswa,
  Orang,
};
