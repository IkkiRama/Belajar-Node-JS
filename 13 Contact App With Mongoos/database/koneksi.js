import mongoose from "mongoose";
await mongoose.connect("mongodb://127.0.0.1:27017/cobaContact");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export { Schema, ObjectId, mongoose };
