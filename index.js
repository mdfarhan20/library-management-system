const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/db_connection");
const requestLogger = require("./middleware/request-logger");
const path = require("path");

connectDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger)

app.use("/images", express.static(path.join(__dirname, "uploads")));

app.use("/books", require("./routes/books-route"));
app.use("/authors", require("./routes/author-route"));
app.use("/members", require("./routes/member-route"));
app.use("/records", require("./routes/records-route"));


app.listen(PORT, () => {
  console.log("Server listening at PORT", PORT);
});