const Roadmap = require("../models/Roadmap");
const { generateRoadmapPDF } = require("../utils/pdfGenerator");


const Application = require("../models/Application");

const {
  generateRoadmapAI,
  analyzeATSAI,
} = require("../services/groqService");



const generateRoadmap = async (req, res) => {
  console.log("Controller Started");

  try {

    const {
      targetRole,
      dreamCompany,
      duration,
      studyHours,
      experience,
      currentSkills
    } = req.body;

    const existingRoadmap =
      await Roadmap.findOne({

        user: req.user.id,

        targetRole,

        dreamCompany

      });

    if (existingRoadmap) {

  return res.status(409).json({
    message: "Roadmap already exists"
  });

}

const roadmap = await generateRoadmapAI(req.body);

const savedRoadmap = await Roadmap.create({
  user: req.user.id,
  targetRole,
  dreamCompany,
  duration,
  studyHours,
  experience,
  roadmap
});

res.status(201).json(savedRoadmap);



  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};




const analyzeATS = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    const application = await Application.findOne({
      _id: req.params.applicationId,
      user: req.user.id,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (!application.resumeText) {
      return res.status(400).json({
        message: "Resume text not found. Please upload a resume first.",
      });
    }

    const result = await analyzeATSAI(
      application.resumeText,
      jobDescription
    );

    res.status(200).json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};




const getRoadmaps = async (req, res) => {

  try {

    const roadmaps = await Roadmap.find({
      user: req.user.id
    }).sort({
      createdAt: -1
    });

    res.status(200).json(roadmaps);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};





const getRoadmapById = async (req, res) => {

    try {

        const roadmap = await Roadmap.findOne({

            _id: req.params.id,

            user: req.user.id

        });

        if (!roadmap) {

            return res.status(404).json({

                message: "Roadmap not found"

            });

        }

        res.status(200).json(roadmap);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


const deleteRoadmap = async (req, res) => {

  try {

    const roadmap = await Roadmap.findOne({

      _id: req.params.id,

      user: req.user.id

    });

    if (!roadmap) {

      return res.status(404).json({

        message: "Roadmap not found"

      });

    }

    await Roadmap.findByIdAndDelete(req.params.id);

    res.status(200).json({

      message: "Roadmap deleted successfully"

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

const downloadRoadmapPDF = async (req, res) => {

  console.log("DOWNLOAD PDF CONTROLLER");

  try {

    const roadmap = await Roadmap.findById(req.params.id);

    console.log(
  JSON.stringify(
    roadmap.roadmap,
    null,
    2
  )
);
    generateRoadmapPDF(roadmap, res);

  } catch (error) {

    console.log(error);     // 👈 Add this

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  generateRoadmap,
  analyzeATS,
  getRoadmaps,
  getRoadmapById,
  deleteRoadmap,
  downloadRoadmapPDF,
};