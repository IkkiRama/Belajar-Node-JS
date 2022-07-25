import ejs from "ejs";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { Book } from "./database/models/index.js";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.render("./home", {
    layout: "./layout/main",
    title: "Halaman Home",
    nama: "Rifki Romadhan",
    isActive: "home",
  });
});

app.get("/books", async (req, res) => {
  const book = await Book.find();
  const belumSelesaiDibaca = [];
  const selesaiDibaca = [];
  book.forEach((b) =>
    b.isComplete ? selesaiDibaca.push(b) : belumSelesaiDibaca.push(b)
  );

  res.render("./books", {
    layout: "./layout/main",
    title: "Halaman Buku",
    isActive: "books",
    selesaiDibaca,
    belumSelesaiDibaca,
  });
});

app.use((req, res) => {
  res.send("Page not found bitchhhhhh");
});

app.listen(port, () => {
  console.log("Server running at http://localhost:3000/");
});
