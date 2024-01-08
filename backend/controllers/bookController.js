const { writeResponse } = require("../utils/utility");
const Book = require("../models/book"); // Assuming the BookModel is in the same directory

async function publishBook(req, res) {
  const { title, author } = req.body;
  const userId = req.userId;

  try {
    const newBook = new Book({ title, author, published: true, userId });
    await newBook.save();
    return writeResponse(null, null, res);
  } catch (error) {
    return writeResponse(
      { code: 500, message: "Something went wrong while publishing the book." },
      null,
      res
    );
  }
}

async function searchBooks(req, res) {
  const searchQuery = req.query.title;
  const userId = req.userId;

  try {
    const books = await Book.find({
      title: new RegExp(searchQuery, "i"),
      userId,
    });
    return writeResponse(null, books, res);
  } catch (error) {
    return writeResponse(
      { code: 500, message: "Something went wrong while searching for books." },
      null,
      res
    );
  }
}

async function unpublishBook(req, res) {
  const bookId = req.params.bookId;
  const userId = req.userId;

  try {
    await Book.updateOne(
      { _id: bookId, userId },
      { $set: { published: false } }
    );
    return writeResponse(null, null, res);
  } catch (error) {
    return writeResponse(
      {
        code: 500,
        message: "Something went wrong while unpublishing the book.",
      },
      null,
      res
    );
  }
}

async function getUserBooks(req, res) {
  const userId = req.userId;

  try {
    const books = await Book.find({ userId });
    return writeResponse(null, books, res);
  } catch (error) {
    return writeResponse(
      {
        code: 500,
        message: "Something went wrong while fetching user's books.",
      },
      null,
      res
    );
  }
}

async function getPublishedBooks(req, res) {
  try {
    const books = await Book.find({ published: true });
    return writeResponse(null, books, res);
  } catch (error) {
    return writeResponse(
      {
        code: 500,
        message: "Something went wrong while fetching published books.",
      },
      null,
      res
    );
  }
}

module.exports = {
  publishBook,
  searchBooks,
  unpublishBook,
  getUserBooks,
  getPublishedBooks,
};
