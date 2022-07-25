import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
mongoose.connect("mongodb://127.0.0.1:27017/bookShelf");

export { Schema, ObjectId };
