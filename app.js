const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contactsRouter");
const userRouter = require('./routes/api/usersRouter');
const filesRouter = require('./routes/api/filesRouter');
const app = express();
// const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const formatsLogger = process.env.NODE_ENV === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);
app.use("/api/files", filesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
