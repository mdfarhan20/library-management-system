const asyncHandler = require("express-async-handler");
const Book = require("../models/book-model");
const Author = require("../models/author-model");
const BorrowRecord = require("../models/borrow-record-model");
const Member = require("../models/member-model");
const cacheData = require("../caching/cache-data");
const { HOST_URL } = require("../constants");
const fs = require('fs');

const getBooks = asyncHandler(async (req, res) => {
  const authorId = req.query.authorId;
  
  let query = {}
  if (authorId)
    query = { authorId }

  const books = await cacheData(`books?authorId=${authorId}`, async () => {
    const books = await Book.find(query);
    return books;
  });
  
  res.status(200).json({ books });
});


const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.statusCode(400);
    throw new Error("Book id required");
  }

  const book = await cacheData(`book?id=${id}`, async () => {
    return (await Book.findById(id));
  });
  
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  res.status(200).json({ book });
});


const addNewBook = asyncHandler(async (req, res) => {
  const { 
    title,
    publishedDate,
    isbn,
    category,
    copies,
    authorId
  } = req.body;
  
  if (!title || !publishedDate || !isbn || !category || !copies || !authorId) {
    res.status(400);
    throw new Error("Insufficient Data");
  }

  const author = await Author.findById(authorId);
  if (!author) {
    res.status(400);
    throw new Error("Invalid Author ID");
  }

  let coverImage = null;
  if (req.file) {
    coverImage = `${HOST_URL}/images/${req.file.filename}`;
  }


  const book = await Book.create({ 
    title, publishedDate, isbn, category, authorId,
    availableCopies: copies, totalCopies: copies,
    coverImage
  });

  if (!book) {
    throw new Error("Book cannot be created");
  }

  await Author.findByIdAndUpdate(authorId, {
    $push: { books: book.id }
  });

  res.status(201).json({ 
    message: "Book has been added to library",
    book
  })
});


const updateBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book =  await Book.findById(id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  let coverImage = book.coverImage;
  if (req.file) {
    let parts = coverImage.split("/")
    let lastImageName = parts[parts.length - 1];
    fs.rmSync(`uploads/${lastImageName}`);
    coverImage = `${HOST_URL}/images/${req.file.filename}`
  }

  await Book.findByIdAndUpdate(id, {...req.body, coverImage }, { new: true });

  res.status(200).json({
    message: "Book updated successfully",
    book
  });
});


const deleteBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  await Author.findByIdAndUpdate(book.authorId, {
    $pull: { books: book.id }
  });

  await Member.updateMany({ borrowedBooks: book.id }, {
    $pull: { borrowedBooks: book.id }
  });

  await BorrowRecord.deleteMany({ bookId: book.id });

  res.status(200).json({
    message: "Book has been deleted",
    book
  });
});

module.exports = { getBooks, getBookById, addNewBook, updateBookById, deleteBookById }

