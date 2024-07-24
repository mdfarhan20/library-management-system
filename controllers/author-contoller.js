const asyncHandler = require("express-async-handler");
const Author = require("../models/author-model");
const Book = require("../models/book-model");
const cacheData = require("../caching/cache-data");

const getAuthors = asyncHandler(async (req, res) => {
  const authors = await cacheData('authors', async () => (await Author.find()));
  res.status(200).json({ authors });
});


const getAuthorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const author = await cacheData(`author?id=${id}`, async () => await Author.findById(id));
  
  if (!author) {
    res.status(404);
    throw new Error("Author not found");
  }

  res.status(200).json({ author });
});


const addNewAuthor = asyncHandler(async (req, res) => {
  const { name, nationality, books } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Insufficient Data");
  }

  const author = await Author.create({ name, nationality, books: books ?? [] });

  if (!author) {
    throw new Error("Author cannot be created");
  }

  await Book.deleteMany({ authorId: author.id });

  res.status(201).json({ 
    message: "Author has been registered",
    author
  })
});


const updateAuthorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const author = await Author.findByIdAndUpdate(id, req.body, { new: true });

  if (!author) {
    res.status(404);
    throw new Error("Author not found");
  }

  res.status(200).json({
    message: "Author updated successfully",
    author
  })
});


const deleteAuthorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const author = await Author.findByIdAndDelete(id);

  if (!author) {
    res.status(404);
    throw new Error("Author not found");
  }

  res.status(200).json({
    message: "Author has been deleted",
    author
  });
});

module.exports = { getAuthors, getAuthorById, addNewAuthor, updateAuthorById, deleteAuthorById }

