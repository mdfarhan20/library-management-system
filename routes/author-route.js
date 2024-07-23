const express = require("express");
const { 
  getAuthors,
  getAuthorById,
  addNewAuthor,
  updateAuthorById,
  deleteAuthorById
} = require("../controllers/author-contoller");

const router = express.Router();

router.route("/")
  .get(getAuthors)
  .post(addNewAuthor)

router.route("/:id")
  .get(getAuthorById)
  .put(updateAuthorById)
  .delete(deleteAuthorById)

module.exports = router;
