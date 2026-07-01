const Chat = require("../models/Chat");
const Roadmap = require("../models/Roadmap");
const { askCareerMentor } = require("../services/chatService");

const askQuestion = async (req, res) => {

  try {

    const { roadmapId, question } = req.body;

    const roadmap = await Roadmap.findById(req.params.id);;

    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap not found"
      });
    }

    const answer = await askCareerMentor(
      roadmap.roadmap,
      question
    );

    const chat = await Chat.create({

      user: req.user.id,

      roadmap: roadmapId,

      question,

      answer

    });

    res.status(201).json(chat);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getChatHistory = async (req, res) => {

  try {

    const chats = await Chat.find({

      roadmap: req.params.roadmapId,

      user: req.user.id

    }).sort({

      createdAt: 1

    });

    res.status(200).json(chats);

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};

module.exports = {
  askQuestion,getChatHistory
};