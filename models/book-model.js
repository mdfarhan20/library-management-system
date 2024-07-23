const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    publishedDate: {
      type: Date,
      required: true
    },
    isbn: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0
    },
    totalCopies: {
      type: Number,
      required: true,
      min: 1
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author"
    }
  }
);

module.exports = mongoose.model("Book", bookSchema);