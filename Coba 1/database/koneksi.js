import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
mongoose.connect("mongodb://127.0.0.1:27017/bookShelf");
let db = mongoose.connection;

// cek db connections
db.once("open", () => {
  console.log("Success to connect");
});

// Cek db from error
db.on("error", (err) => {
  console.log(err);
});

export { mongoose, Schema, ObjectId };
