const Application = require("../models/Application");

const createApplication = async (req, res) => {
  try {

    const { companyName, role, status } = req.body;

    const application = await Application.create({
      companyName,
      role,
      status,
      user: req.user.id
    });

    res.status(201).json(application);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getApplications = async (req, res) => {
  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 5;

    const skip =
      (page - 1) * limit;

    const query = {
      user: req.user.id
    };

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.company) {
      query.companyName = req.query.company;
    }

    const applications =
      await Application.find(query)
        .skip(skip)
        .limit(limit);

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateApplication = async (req, res) => {
  try {

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    application.status = req.body.status;

    await application.save();

    res.status(200).json(application);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getStats = async (req, res) => {
  try {

    const applied = await Application.countDocuments({
      user: req.user.id,
      status: "Applied"
    });

    const oa = await Application.countDocuments({
      user: req.user.id,
      status: "OA"
    });

    const interview = await Application.countDocuments({
      user: req.user.id,
      status: "Interview"
    });

    const rejected = await Application.countDocuments({
      user: req.user.id,
      status: "Rejected"
    });

    const offer = await Application.countDocuments({
      user: req.user.id,
      status: "Offer"
    });

    res.status(200).json({
      Applied: applied,
      OA: oa,
      Interview: interview,
      Rejected: rejected,
      Offer: offer
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const deleteApplication = async (req, res) => {
  try {

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    if (
      application.user.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    await application.deleteOne();

    res.status(200).json({
      message: "Application deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createApplication,getApplications,updateApplication,getStats,
  deleteApplication
};