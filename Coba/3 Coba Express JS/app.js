import path from "path";
import express from "express";
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

app.get("/ip", (req, res) => {
  res.send(req.ip);
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

app.use((req, res) => {
  res.send("Page not found bitchhhhhh");
});

app.listen(port, () => {
  console.log("Server running at http://localhost:3000/");
});
