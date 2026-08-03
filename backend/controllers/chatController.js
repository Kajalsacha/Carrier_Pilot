const Chat = require("../models/Chat");
const Roadmap = require("../models/Roadmap");
const { askCareerMentor } = require("../services/chatService");

const askQuestion = async (req, res) => {

  try {

    const { message } = req.body;

    // Context-aware mentor: use the user's most recent roadmap instead of
    // requiring the frontend to track/pass a roadmapId.
    const roadmap = await Roadmap.findOne({
      user: req.user.id
    }).sort({
      createdAt: -1
    });

    if (!roadmap) {
      return res.status(400).json({
        message: "Generate a roadmap first so your AI Mentor can give personalized guidance."
      });
    }

    const recentChats = await Chat.find({
      user: req.user.id,
      roadmap: roadmap._id
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const answer = await askCareerMentor(
      roadmap,
      recentChats.reverse(),
      message
    );

    await Chat.create({
      user: req.user.id,
      roadmap: roadmap._id,
      question: message,
      answer
    });

    res.status(201).json({ reply: answer });

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