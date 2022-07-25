import express from "express";
import expressLayouts from "express-ejs-layouts";
// import methodOverride from "method-override";

import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";

// Router Import
import DashboardRouter from "./routes/dashboard.js";
import AboutRouter from "./routes/about.js";
import ArtikelRouter from "./routes/artikel.js";

const app = express();

app.set("view engine", "ejs");
// app.configure(function () {
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));

// Konfiguasi Flash Message
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: 6000,
    },
  })
);
app.use(flash());
// });

// Router Files
app.use("/", DashboardRouter);
app.use("/about", AboutRouter);
app.use("/artikel", ArtikelRouter);

app.use((req, res) => {
  res.send("Page Not Found Bitch");
});

app.listen(3000, () => {
  console.log("Running on http://localhost:3000/");
});
