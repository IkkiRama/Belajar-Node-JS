import http from "http";
import fs from "fs";

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("Error : File Not Found!!!");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    const url = req.url;
    switch (url) {
      case "/":
        renderHTML("index.html", res);
        break;
      case "/about":
        renderHTML("about.html", res);
        break;
      case "/contact":
        res.write("<h1>Ini halaman Contact </h1>");
        break;
      default:
        renderHTML("pageNotFound.html", res);
        break;
    }

    // if (url === "/about") {
    //   res.write("<h1>Ini Halaman About Bitch</h1>");
    // } else if (url === "/contact") {
    //   res.write("<h1>Ini Halaman Contact</h1>");
    // } else {
    //   res.write("Hello World");
    // }
  })
  .listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
    console.log("Server running on port 3000");
  });
