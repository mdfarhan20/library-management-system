const express = require("express");
const {
  getBooks, 
  getBookById, 
  addNewBook,
  updateBookById,
  deleteBookById
} = require("../controllers/books-contoller");

const router = express.Router();

router.route("/")
  .get(getBooks)
  .post(addNewBook)

router.route("/:id")
  .get(getBookById)
  .put(updateBookById)
  .delete(deleteBookById)

module.exports = router;