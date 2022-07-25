import { ObjectId, Schema, mongoose } from "../koneksi.js";
const ContactSchema = new Schema({
  id: ObjectId,
  nama: {
    type: String,
    require: true,
  },
  noHp: {
    type: String,
    require: true,
    max: 13,
  },
  email: {
    type: String,
  },
  alamat: {
    type: String,
  },
});
export { ContactSchema, mongoose };
