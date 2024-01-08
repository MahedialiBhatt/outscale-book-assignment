const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
