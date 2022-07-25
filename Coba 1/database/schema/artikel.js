import { mongoose, Schema, ObjectId } from "../koneksi.js";

const ArtikelSchema = new Schema({
  id: ObjectId,
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
});

export { mongoose, ArtikelSchema };
