const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  targetRole: {
    type: String,
    required: true
  },

  dreamCompany: {
    type: String,
    default: ""
  },

  duration: {
    type: String,
    required: true
  },

  studyHours: {
    type: Number,
    required: true
  },

  experience: {
    type: String,
    default: "Beginner"
  },

  roadmap: {
    type: Object,
    required: true
  },


}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Roadmap",
  roadmapSchema
);