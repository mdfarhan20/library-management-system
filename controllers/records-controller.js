const asyncHandler = require("express-async-handler");
const BorrowRecord = require("../models/borrow-record-model");
const Member = require("../models/member-model");
const Book = require("../models/book-model");
const cacheData = require("../caching/cache-data");


const getRecords = asyncHandler(async (req, res) => {
  const records = await cacheData('records', async () => await BorrowRecord.find());
  res.status(200).json({ records });
});


const createNewRecord = asyncHandler(async (req, res) => {
  const { memberId, bookId } = req.body;

  if (!memberId || ! bookId) {
    res.status(400);
    throw new Error("User ID adn Book ID required");
  }

  const records = await BorrowRecord.find({ memberId, bookId }).sort("-borrowDate");
  if (records.length > 0 && !records[0].returnDate) {
    res.status(400);
    throw new Error("Member already has a copy");
  }

  const member = await Member.findById(memberId);
  const book = await Book.findById(bookId);

  if (!member || !book) {
    res.status(404);
    throw new Error("Member or Book not found");
  }

  if (book.availableCopies <= 0) {
    res.status(400);
    throw new Error("Book is not available");
  }

  await BorrowRecord.create({ memberId, bookId });
  await Member.findByIdAndUpdate(memberId, {
    $push: { borrowedBooks: bookId }
  });
  await Book.findByIdAndUpdate(bookId, {
    availableCopies: book.availableCopies - 1
  });

  res.status(201).json({
    message: "Record created"
  })
});


const returnBook = asyncHandler(async (req, res) => {
  const { memberId, bookId } = req.body;
  
  if (!memberId || ! bookId) {
    res.status(400);
    throw new Error("User ID adn Book ID required");
  }

  const records = await BorrowRecord.find({ memberId, bookId }).sort("-borrowDate");
  if (records.length <= 0) {
    res.status(400);
    throw new Error("The member has not borrowed this book");
  }

  const latestRecord = records[0];
  if (latestRecord.returnDate) {
    res.status(400);
    throw new Error("The book is already returned");
  }

  await BorrowRecord.findByIdAndUpdate(latestRecord.id, { returnDate: Date.now() })
  await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: 1 }  });
  await Member.findByIdAndUpdate(memberId, { $pull: { borrowedBooks: bookId } });

  res.status(200).json({ message: "Book has been returned" })
});


const updateRecordById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const record = await BorrowRecord.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({ 
    message: "Record updated",
    record
  });
});



const deleteRecordById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const record = await BorrowRecord.findByIdAndDelete(id);

  res.status(200).json({ 
    message: "Record deleted",
    record
  });
});

module.exports = { getRecords, createNewRecord, returnBook, updateRecordById, deleteRecordById }