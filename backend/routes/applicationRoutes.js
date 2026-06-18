const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createApplication,getApplications, updateApplication,getStats,
  deleteApplication,replaceResume
} = require("../controllers/applicationController");

router.post("/",authMiddleware, upload.single("resume"),createApplication);
router.get("/",authMiddleware,getApplications);

router.get("/stats",authMiddleware,getStats);

router.put(
  "/:id",
  authMiddleware,
  updateApplication
);

router.delete(
  "/:id",
  authMiddleware,
  deleteApplication
);

router.put(
  "/:id/resume",
  authMiddleware,
  upload.single("resume"),
  replaceResume
);


module.exports = router;