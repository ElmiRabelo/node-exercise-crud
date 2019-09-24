const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

//nunjucks configuração
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.set("view engine", "njk");

//express ler informações de form
app.use(express.urlencoded({ extended: false }));

let userAge;
//setAgeInReq Middleware
function setAgeInReq(req, res, next) {
  const { age } = req.body;
  userAge = age;
  return next();
}

//rotas
app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/check", (req, res) => {
  const { age } = req.body;
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`);
  } else {
    return res.redirect(`/minor?age=${age}`);
  }
});

app.get("/major", (req, res) => {
  const { age } = req.query;
  return res.render("major", { age });
});

app.get("/minor", (req, res) => {
  const { age } = req.query;
  return res.render("minor", { age });
});

app.listen(3005);
