import mongoose from "mongoose";
import BookSchema from "../schema/books.js";
const Book = mongoose.model("book", BookSchema);

export { Book };

// const book1 = new Book({
//   title: "Richhh",
//   author: "RObert",
//   isComplete: false,
// });
// book1.save().then((result) => console.log(result));
