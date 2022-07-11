// const child = require("./indexChild");
const { hoby, cetakNama, mahasiswa, Orang } = require("./indexChild");

// console.log(child.cetakNama("Rifki"));
// console.log(child.hoby);
console.log("Hello World");
console.log(cetakNama("Rifki"));
console.log(hoby);
console.log(mahasiswa);
console.log(mahasiswa.cetakNama());

const orang1 = new Orang("Rifki", 17, "Koding Web");
console.log(orang1);
console.log(orang1.cetakNama());
