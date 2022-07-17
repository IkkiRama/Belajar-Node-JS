import chalk from "chalk";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import { body, validationResult, check } from "express-validator";
import {
  loadData,
  findContact,
  addContact,
  deleteContact,
  editContact,
} from "./utils/contact.js";

import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Konfiguasi Flash Message
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      //secure: true,
      maxAge: 6000,
    },
  })
);
app.use(flash());

app.get("/", (req, res) => {
  res.render("index", {
    title: "Halaman Home",
    layout: "./partials/main",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "./partials/main",
  });
});

app.get("/contact", (req, res) => {
  res.render("contacts", {
    title: "Halaman Contact",
    layout: "./partials/main",
    contacts: loadData(),
    success: req.flash("success"),
    error: req.flash("error"),
  });
});
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = findContact(value);
      if (duplikat) {
        throw new Error("Nama Sudah Digunakan!");
      }
      return true;
    }),
    check("email", "Email Tidak Valid").isEmail(),
    check("noHp").isMobilePhone("id-ID").withMessage("No Hp tidak valid"),
    body("alamat", "Alamat minimal mengandung 10 karakter").isLength({
      min: 10,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("contacts", {
        title: "Halaman Contact",
        layout: "./partials/main",
        contacts: loadData(),
        errors: errors.array(),
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } else {
      addContact(req.body);
      req.flash("success", "Contact Berhasil Ditambahkan");
      res.redirect("/contact");
    }
  }
);

app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("edit-contact", {
    title: "Halaman Edit",
    layout: "./partials/main",
    contact,
  });
});

app.post(
  "/contact/edit/:nama",
  [
    body("nama").custom((value, { req }) => {
      const duplikat = findContact(value);
      // if (value.length <= 3) {
      //   throw new Error("Nama minimal 3 karakter!");
      // }
      if (req.params.nama !== value && duplikat) {
        throw new Error("Nama Sudah Digunakan!");
      }
      return true;
    }),
    check("email", "Email Tidak Valid").isEmail(),
    check("noHp").isMobilePhone("id-ID").withMessage("No Hp tidak valid"),
    body("alamat", "Alamat minimal mengandung 10 karakter").isLength({
      min: 10,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const data = {
        id: req.query.id,
        oldNama: req.params.nama,
        nama: req.body.nama,
        email: req.body.email,
        noHp: req.body.noHp,
        alamat: req.body.alamat,
      };
      res.render("edit-contact", {
        title: "Halaman Edit",
        layout: "./partials/main",
        contact: data,
        errors: errors.array(),
        error: req.flash("error"),
      });
    } else {
      editContact(req.params.nama, req.body, req.query.id);
      req.flash("success", "Contact Berhasil Diubah");
      res.redirect("/contact");
    }
  }
);

app.get("/contact/hapus/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  if (!contact) {
    res.status(404).send("Contact Tidak Ditemukan");
  } else {
    deleteContact(req.params.nama);
    req.flash("success", "Contact Berhasil Dihapus");
    res.redirect("/contact");
  }
});

app.get("/contact/:nama", (req, res) => {
  const nama = req.params.nama;
  const contact = findContact(nama);
  res.render("contact", {
    title: `Detail Contact ${contact.nama}`,
    layout: "./partials/main",
    contact,
  });
});

app.use((req, res) => {
  res.status(404).send("Page Not Foundddd");
});

app.listen(port, () => {
  let message = `Listen to ${chalk.blueBright(`http://localhost:${port}`)}`;
  `)}`;
  console.log(message);
});
