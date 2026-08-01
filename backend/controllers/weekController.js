const Roadmap = require("../models/Roadmap");

const {
  generateWeekPlanAI,
} = require("../services/groqService");

const generateWeekPlan = async (req, res) => {

  try {

    const {

      roadmapId,

      week,

    } = req.body;

    const roadmap = await Roadmap.findOne({

      _id: roadmapId,

      user: req.user.id,

    });

    if (!roadmap) {

      return res.status(404).json({

        message: "Roadmap not found",

      });

    }

    const result = await generateWeekPlanAI(

      roadmap,

      week

    );

    res.status(200).json(result);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,

    });

  }

};

module.exports = {

  generateWeekPlan,

};