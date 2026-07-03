const Application = require("../models/Application");
const extractResumeText =require("../utils/extractResumeText");
const fs = require("fs");
const path = require("path");

const createApplication = async (req, res) => {
  try {
const { companyName, role, status } = req.body;

let resume = "";
let resumeText = "";

if(req.file){ 
  resume = req.file.filename;
 
  resumeText = await extractResumeText(
     req.file.path
  );
}



const application = await Application.create({
  companyName,
  role,
  status,
  resume,
  resumeText,
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
      Number(req.query.limit) || 100;

    const skip =
      (page - 1) * limit;

    const query = {
      user: req.user.id
    };

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.company) {
      query.companyName = {
  $regex: req.query.company,
  $options: "i",
};
    }

    const applications =
  await Application.find(query)
    .sort({ createdAt: -1 })
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


const replaceResume = async (req, res) => {
  try {

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume"
      });
    }

    if (application.resume) {

      const oldResumePath = path.join(
        __dirname,
        "../uploads",
        application.resume
      );

      if (fs.existsSync(oldResumePath)) {
        fs.unlinkSync(oldResumePath);
      }
    }

    application.resume = req.file.filename;

    application.resumeText =await extractResumeText(req.file.path);
    
    await application.save();

    res.status(200).json({
      message: "Resume Updated Successfully",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createApplication,getApplications,updateApplication,getStats,deleteApplication
  ,replaceResume
};