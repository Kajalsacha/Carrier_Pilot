const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createApplication,getApplications, updateApplication,getStats,
  deleteApplication
} = require("../controllers/applicationController");

router.post("/",authMiddleware,createApplication);
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


module.exports = router;