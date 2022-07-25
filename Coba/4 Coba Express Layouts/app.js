import ejs from "ejs";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.render("./index", {
    layout: "./layout/main",
    title: "Index EJS COBA",
    nama: "Rifki Romadhan",
  });
});

app.get("/about", (req, res) => {
  res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("./contact.html", { root: __dirname });
});

app.get("/json", (req, res) => {
  res.json([
    {
      nama: "Rifki Romadhan",
      umur: 17,
    },
    {
      nama: "Rifki Anjay",
      umur: 20,
    },
  ]);
});

app.get("/product/:nama", (req, res) => {
  res.send(
    `Product ini bernama ${req.params.nama}, dan mempunyai id =  ${req.query.id}`
  );
});

app.get("/kemeja/:nama", (req, res) => {
  res.render("./kemeja", {
    layout: "./layout/main",
    title: "Kemeja",
    id: req.query.id,
    jenis: req.params.nama,
  });
});

app.use((req, res) => {
  res.send("Page not found bitchhhhhh");
});

app.listen(port, () => {
  console.log("Server running at http://localhost:3000/");
});
