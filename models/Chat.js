const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  userList: {
    type: Array,
    required: true,
    unique: true
  },
  messageList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
