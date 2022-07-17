import chalk from "chalk";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => res.sendFile("./partials/index.html", {root : __dirname}));

app.listen(port, () => {
  let message = `Server running on ${chalk.blueBright(
    `http://localhost:${port}`
  )}`;
  console.log(message);
});
