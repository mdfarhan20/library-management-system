const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/db_connection");

connectDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/books", require("./routes/books-route"));
app.use("/author", require("./routes/author-route"));
app.use("/members", require("./routes/member-route"));
app.use("/records", require("./routes/records-route"));


app.listen(PORT, () => {
  console.log("Server listening at PORT", PORT);
});