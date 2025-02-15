const mongoose = require('mongoose');

const borrowRecordSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  borrowDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true,
    default: () => Date.now() + 7*24*60*60*1000
  },
  returnDate: {
    type: Date
  }
});

module.exports = mongoose.model('BorrowRecord', borrowRecordSchema);
