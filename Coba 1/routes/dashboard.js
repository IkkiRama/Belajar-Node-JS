import express from "express";
const router = express.Router();
export default router.get("/", (req, res) => {
  const artikel = [
    {
      title: "Artikel 1",
      author: "Rifki Romadhan",
      body: "This is Artikel 1",
    },
    {
      title: "Artikel 2",
      author: "Rifki Romadhan",
      body: "This is Artikel 2",
    },
    {
      title: "Artikel 3",
      author: "Rifki Romadhan",
      body: "This is Artikel 3",
    },
  ];

  res.render("./dashboard/home", {
    title: "Halaman Home",
    layout: "./layouts/main",
    artikel,
  });
});
