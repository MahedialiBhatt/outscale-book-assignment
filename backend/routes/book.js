const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
const { verifyToken } = require("../middleware/auth");

router.post("/publish", verifyToken, async (req, res) => {
  return await bookController.publishBook(req, res);
});

router.get("/search", verifyToken, async (req, res) => {
  return await bookController.searchBooks(req, res);
});

router.put("/unpublish/:bookId", verifyToken, async (req, res) => {
  return await bookController.unpublishBook(req, res);
});

router.get("/user", verifyToken, async (req, res) => {
  return await bookController.getUserBooks(req, res);
});

router.get("/published", verifyToken, async (req, res) => {
  return await bookController.getPublishedBooks(req, res);
});

module.exports = router;
