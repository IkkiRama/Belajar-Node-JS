import http from "http";
import fs from "fs";

const Render = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write(err);
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
        Render("./index.html", res);
        break;
      case "/about":
        Render("./about.html", res);
        break;
      case "/contact":
        Render("./contact.html", res);
        break;

      default:
        res.write("Page Not Found");
        res.end();
        break;
    }
  })
  .listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
  });
