const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/register/", async (req, res) => {
  return await authController.register(req, res);
});

router.post("/login/", async (req, res) => {
  return await authController.login(req, res);
});

module.exports = router;
