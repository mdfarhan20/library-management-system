const asyncHandler = require("express-async-handler");
const Book = require("../models/book-model");

const getBooks = asyncHandler(async (req, res) => {
  const authorId = req.query.authorId;
  
  let query = {}
  if (authorId)
    query = { authorId }

  const books = await Book.find(query);
  res.status(200).json({ books });
});


const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!id) {
    res.statusCode(400);
    throw new Error("Book id required");
  }

  const book = await Book.findById(id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  res.status(200).json({ book });
});


module.exports = { getBooks, getBookById }