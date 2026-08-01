const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  generateWeekPlan,
} = require("../controllers/weekController");

router.post(
  "/",
  authMiddleware,
  generateWeekPlan
);

module.exports = router;