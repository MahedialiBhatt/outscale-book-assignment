const express = require("express");
const router = express.Router();
const authRoutes = require("../routes/auth");
const bookRoutes = require("../routes/book");

router.use(authRoutes, bookRoutes);

module.exports = router;
