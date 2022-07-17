import fs from "fs";
import validator from "validator";

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
}
if (!fs.existsSync("./data/contacts.json")) {
  fs.writeFile("./data/contacts.json", JSON.stringify([]), (err) => {
    if (err) throw err;
  });
}

const loadData = () =>
  JSON.parse(fs.readFileSync("./data/contacts.json", "utf-8"));

const findContact = (nama) => {
  const contacts = loadData();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  if (contact) {
    return contact;
  }
};

const saveContact = (contact) =>
  fs.writeFileSync("./data/contacts.json", JSON.stringify(contact));

const addContact = (contact) => {
  const contacts = loadData();
  const data = {
    id: parseInt(Math.random() * 112983123),
    nama: contact.nama,
    email: contact.email,
    noHp: contact.noHp,
    alamat: contact.alamat,
  };
  contacts.push(data);
  saveContact(contacts);
};

const deleteContact = (nama) => {
  const contacts = loadData();
  const newContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContact(newContacts);
};

const editContact = (namaLama, data, id) => {
  const contacts = loadData();
  const { nama, email, noHp, alamat } = data;
  const newContact = {
    id: parseInt(id),
    nama,
    email,
    noHp,
    alamat,
  };
  const index = contacts.findIndex((contact) => contact.nama === namaLama);
  if (index !== -1) {
    contacts.splice(index, 1, newContact);
    saveContact(contacts);
  }
};

export { loadData, findContact, addContact, deleteContact, editContact };
