const express = require("express");
const { getBooks, getBookById } = require("../controllers/books-contoller");

const router = express.Router();

router.route("/")
  .get(getBooks)

router.route("/:id")
  .get(getBookById)

module.exports = router;