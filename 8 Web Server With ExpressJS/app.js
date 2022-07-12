import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("./contact.html", { root: __dirname });
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
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(`Example app listening on port ${port}`);
});
