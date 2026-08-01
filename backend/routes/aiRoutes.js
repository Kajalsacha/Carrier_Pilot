const express = require("express");
console.log("AI Routes Loaded");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const {
  generateRoadmap,
  analyzeATS,
  getRoadmaps,
  getRoadmapById,
  deleteRoadmap,
  downloadRoadmapPDF,
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


router.post(
  "/ats/:applicationId",
  authMiddleware,
  analyzeATS
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


router.get("/test", (req, res) => {
    res.json({ message: "AI route working" });
});


module.exports = router;