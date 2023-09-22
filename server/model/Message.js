const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: ObjectId,
      ref: 'Conversation'
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);