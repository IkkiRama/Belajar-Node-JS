import express from "express";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Third Party Middleware
app.use(expressLayouts);
app.use(morgan("dev"));

// Build-in Middleware
app.use(express.static(path.join(__dirname, "public")));

// Aplication Level Middleware
// Next harus ditulis
app.use((req, res, next) => {
  console.log(`Aplication Level Middleware, and time : ${Date.now()}`);
  next();
});

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
    layout: "partials/main",
    title: "Halaman About",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    layout: "partials/main",
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
  res.status(404).send("404 Page Not Found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(`Example app listening on port ${port}`);
});
