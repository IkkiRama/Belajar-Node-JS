import {ContactSchema, mongoose} from "../schema/contact.js";
const Contact = mongoose.model("Contact", ContactSchema);
export { Contact };

// Menambahkan 1 data ke database
// const contact1 = new Contact({
//   nama: "Rifki lol",
//   noHp: "082133320489",
//   email: "rifkianjay@gmail.com",
// });

// contact1.save().then((result) => console.log(result));
