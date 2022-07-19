import pkg from "mongodb";
const { MongoClient } = pkg;

const url = "mongodb://127.0.0.1:27017";
const dbName = "cobaContact";

// Like This
// const ObjectId = pkg.ObjectId;
// or Like This
const ObjectId = pkg.ObjectID;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, client) => {
  if (err) {
    return console.log(err);
  }
  const db = client.db(dbName);

  // Menambakan satu data
  // db.collection("mahasiswa").insertOne(
  //   { name: "Rizki", age: 20 },
  //   (err, result) => {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log(result.ops);
  //   }
  // );

  // Menambakan beberapa data
  // db.collection("mahasiswa").insertMany(
  //   [
  //     { name: "Rizki", age: 20 },
  //     { name: "Rizki anjayyyyyy", age: 90 },
  //   ],
  //   (err, result) => {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log(result.ops);
  //   }
  // );

  // // Menampilkan semua data yang ada di collection mahasiswa
  // const hasil = db
  //   .collection("mahasiswa")
  //   .find()
  //   .toArray((err, res) => {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log(res);
  //   });
  // console.log(hasil);

  // Menampilkan semua data yang ada di collection mahasiswa
  // const hasil = db
  //   .collection("mahasiswa")
  //   .find({ _id: ObjectId("62d3b978e9cbb71dbc665a7c") })
  //   // .find({ nama: "Rifki Romadhan" })
  //   .toArray((err, res) => {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log(res);
  //   });
  // console.log(hasil);

  // Mengubah data berdasarkan id yang ada di collection mahasiswa
  // const updatePromise = db.collection("mahasiswa").updateOne(
  //   {
  //     _id: ObjectId("62d3b978e9cbb71dbc665a7c"),
  //   },
  //   {
  //     $set: {
  //       name: "Rifki Anjay Kimak",
  //       email: "lol@lol .com",
  //       isJomblo: true,
  //     },
  //   }
  // );

  // Mengupdate data lebih dari satu berdasarkan id yang ada di collection mahasiswa
  // const updatePromise = db.collection("mahasiswa").updateMany(
  //   {
  //     nama: "Rifki Romadhan",
  //   },
  //   {
  //     $set: {
  //       nama: "Rifki llo",
  //       email: "op@gmail.com",
  //     },
  //   }
  // );

  // updatePromise
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // Menghapus data berdasarkan id yang ada di collection mahasiswa
  // db.collection("mahasiswa")
  //   .deleteOne({
  //     _id: ObjectId("62d3b978e9cbb71dbc665a7c"),
  //   })
  //   .then((result) => console.log(result))
  //   .catch((err) => console.log(err));

  // Menghapus data lebih dari satu berdasarkan id yang ada di collection mahasiswa
  // db.collection("mahasiswa")
  //   .deleteMany({
  //     name: "Rizki",
  //   })
  //   .then((result) => console.log(result))
  //   .catch((err) => console.log(err));
});
