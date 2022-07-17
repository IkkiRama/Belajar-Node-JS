import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mahasiswa = [
  {
    nama: "Rifki Romadhan",
    jurusan: "IESP",
  },
  {
    nama: "Feillany",
    jurusan: "Akutansi",
  },
];

app.get("/", (req, res) => {
  res.render("index", {
    layout: "partials/main",
    title: "Halaman Home",
    umur: 17,
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Halaman Contact",
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID:  ${req.params.id} <br> dan Product Name: ${req.query.category}`
  );
});

app.get("/json", (req, res) => {
  res.json({
    nama: "Rifki",
    umur: 20,
    alamat: "Jakarta",
  });
});
app.use("/", (req, res) => {
  res.status(404).render("pageNotFound");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(`Example app listening on port ${port}`);
});
