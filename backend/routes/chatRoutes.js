const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { askQuestion ,getChatHistory} = require("../controllers/chatController");

router.post( "/", authMiddleware, askQuestion );

router.get(
  "/:roadmapId",
  authMiddleware,
  getChatHistory
);

module.exports = router;