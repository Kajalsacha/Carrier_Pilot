const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


const {
  generateRoadmap,
  getRoadmaps,getRoadmapById,deleteRoadmap,downloadRoadmapPDF
} = require("../controllers/aiController");

// Generate AI Career Roadmap
router.post(
  "/roadmap",
  authMiddleware,
  generateRoadmap
);

router.get(
  "/roadmaps",
  authMiddleware,
  getRoadmaps
);

router.get("/roadmaps/:id/pdf", downloadRoadmapPDF);



router.get(
    "/roadmaps/:id",
    authMiddleware,
    getRoadmapById
);


router.delete(
  "/roadmaps/:id",
  authMiddleware,
  deleteRoadmap
);


module.exports = router;