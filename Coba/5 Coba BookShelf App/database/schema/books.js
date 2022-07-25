import { Schema, ObjectId } from "../koneksi.js";
const BookSchema = new Schema({
  id: ObjectId,
  title: {
    type: String,
    require: true,
    min: 3,
  },
  author: {
    type: String,
    require: true,
  },
  date: { type: Date, default: Date.now },
  isComplete: {
    type: Boolean,
    require: true,
  },
});

export default BookSchema;
