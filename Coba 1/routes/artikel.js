import express from "express";
import { Artikel } from "../database/models/index.js";
import { validationResult, check } from "express-validator";

const router = express.Router();

export default router
  .get("/", async (req, res) => {
    let artikel = await Artikel.find();
    res.render("./artikel/artikel", {
      title: "Halaman Artikel",
      layout: "./layouts/main",
      artikel,
      success: req.flash("success"),
    });
  })

  .get("/add", (req, res) => {
    res.render("./artikel/addArtikel", {
      title: "Halaman Tambah Artikel",
      layout: "./layouts/main",
      errors: "",
    });
  })

  .post(
    "/add",
    check("title").custom(async (value, { req }) => {
      let artikel = await Artikel.findOne({ title: req.body.title });
      if (artikel) {
        throw new Error("Judul Artikel Sudah ada");
      }
    }),
    check("author", "Harus berisi minimal 3 kata").isLength({ min: 3 }),
    check("body", "Harus berisi minimal 100 kata").isLength({ min: 100 }),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("./artikel/addArtikel", {
          title: "Halaman Tambah Artikel",
          layout: "./layouts/main",
          errors: errors.array(),
        });
      } else {
        let artikel = {
          title: req.body.title,
          author: req.body.author,
          body: req.body.body,
        };

        Artikel.insertMany(artikel, (err, data) => {
          if (err) {
            res.send(err);
          } else {
            req.flash("success", "Data Berhasil Ditambahkan");
            res.redirect("/artikel");
          }
        });
      }
    }
  )

  .get("/ubah/:title", async (req, res) => {
    let artikel = await Artikel.findOne({ title: req.params.title });
    res.render("./artikel/editArtikel", {
      title: "Halaman Edit Artikel",
      layout: "./layouts/main",
      artikel,
    });
  })

  .post("/ubah/:id", (req, res) => {})
  .post("/deleteAll", (req, res) => {
    Artikel.remove({}).then((result) => {
      if (result.deletedCount > 0) {
        req.flash("success", "Data Berhasil Dihapus");
        res.redirect("/artikel");
      }else{
        res.send("Something wrong in this route");
      }
    });
  })
  .post("/hapus/:title", (req, res) => {
    Artikel.deleteOne({ title: req.params.title }).then((result) => {
      if (result.deletedCount > 0) {
        req.flash("success", "Data Berhasil Dihapus");
        res.redirect("/artikel");
      } else {
        res.send("Something wrong in this route");
      }
    });
  })

  .get("/:title", async (req, res) => {
    let artikel = await Artikel.findOne({ title: req.params.title });
    res.render("./artikel/detailArtikel", {
      title: `Detail Artikel ${req.params.title}`,
      layout: "./layouts/main",
      artikel,
    });
  });
