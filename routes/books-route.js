const express = require("express");
const {
  getBooks, 
  getBookById, 
  addNewBook,
  updateBookById,
  deleteBookById
} = require("../controllers/books-contoller");
const uploads = require("../config/file-upload-setup");

const router = express.Router();

router.route("/")
  .get(getBooks)
  .post(uploads.single('coverImage'), addNewBook)

router.route("/:id")
  .get(getBookById)
  .put(uploads.single('coverImage'), updateBookById)
  .delete(deleteBookById)

module.exports = router;