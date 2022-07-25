import chalk from "chalk";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import { body, validationResult, check } from "express-validator";
import methodOverride from "method-override";

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";

// Models
import { Contact } from "./database/model/index.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

app.get("/contact", async (req, res) => {
  res.render("contacts", {
    title: "Halaman Contact",
    layout: "./partials/main",
    contacts: await Contact.find(),
    success: req.flash("success"),
    error: req.flash("error"),
  });

  // Contact.find((err, data) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.render("contacts", {
  //       title: "Halaman Contact",
  //       layout: "./partials/main",
  //       contacts: data,
  //       success: req.flash("success"),
  //       error: req.flash("error"),
  //     });
  //   }
  // });
});

app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("contacts", {
        title: "Halaman Contact",
        layout: "./partials/main",
        contacts: await Contact.find(),
        errors: errors.array(),
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } else {
      Contact.insertMany(req.body, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          req.flash("success", "Data Berhasil Ditambahkan");
          res.redirect("/contact");
        }
      });
    }
  }
);

app.delete("/contact", (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    if (result.deletedCount > 0) {
      req.flash("success", "Data Berhasil Dihapus");
      res.redirect("/contact");
    }
  });
});

app.get("/contact/edit/:nama", async function (req, res) {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("edit-contact", {
    title: "Halaman Edit",
    layout: "./partials/main",
    contact,
  });
});

app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (req.body.oldNama !== value && duplikat) {
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
        oldNama: req.body.oldNama,
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

      // res.send(errors);
    } else {
      Contact.updateOne(
        {
          nama: req.body.oldNama,
        },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            noHp: req.body.noHp,
            alamat: req.body.alamat,
          },
        }
      )
        .then((result) => {
          req.flash("success", "Contact Berhasil Diubah");
          res.redirect("/contact");
        })
        .catch((err) => {
          res.send(err);
          // req.flash("error", "Contact Gagal Diubah");
          // res.redirect("/contact");
        });
    }
  }
);

app.get("/contact/:nama", async (req, res) => {
  const nama = req.params.nama;
  const contact = await Contact.findOne({ nama: nama });
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
