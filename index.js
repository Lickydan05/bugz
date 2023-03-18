const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

const PORT = 3000;

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/views/", "index.html"));
});

app.get("/profile", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/views/", "profile.html"));
});

app.get("/math", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/views/", "math.html"));
});

app.get("/faq", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/views/", "faq.html"));
});

app.get("/terms", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/views/", "terms.html"));
});
