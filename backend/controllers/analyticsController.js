const Application = require("../models/Application");

exports.getAnalytics = async (req, res) => {
  try {

    const totalApplications = await Application.countDocuments({
      user: req.user.id,
    });

    const applied = await Application.countDocuments({
      user: req.user.id,
      status: "Applied",
    });

    const oa = await Application.countDocuments({
      user: req.user.id,
      status: "OA",
    });

    const interview = await Application.countDocuments({
      user: req.user.id,
      status: "Interview",
    });

    const offer = await Application.countDocuments({
      user: req.user.id,
      status: "Offer",
    });

    const rejected = await Application.countDocuments({
      user: req.user.id,
      status: "Rejected",
    });

    res.json({
      totalApplications,
      applied,
      oa,
      interview,
      offer,
      rejected,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};