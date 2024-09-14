const express = require("express");
const app = express();
const dbConfig = require("./config/db.config.js");

app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");

app.use(cors());
const { json, urlencoded } = require("body-parser");

app.options("*", cors());
app.use(json({}));
app.use(urlencoded({ extended: true }));

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Server Running" });
});

app.use("/api", require("./routes"));
app.use("*", (req, res, next) => {
  try {
    return res.status(404).json({
      error: "Not Found",
      message: "Invalid Endpoint",
    });
  } catch (error) {
    next(error);
  }
});
dbConfig()
  .then(() => {
    console.log("DB connection created");
  })
  .catch((e) => {
    console.log("DB connection failed", e);
  });

app.use(require("./utils/error/errorHandler.js"));

app.listen(process.env.PORT, () => {
  console.log("Server Listening On PORT =>", process.env.PORT);
});

module.exports = app;
