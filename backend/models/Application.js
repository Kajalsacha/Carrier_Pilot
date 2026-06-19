const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true
    },

    role: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "OA",
        "Interview",
        "Rejected",
        "Offer"
      ],
      default: "Applied"
    },

    resume:{
   type:String,
   default:""
},

resumeText: {
   type: String,
   default: ""
},

    appliedDate: {
      type: Date,
      default: Date.now
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);