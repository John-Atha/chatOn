const Mongoose = require("mongoose");

const MessageSchema = new Mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    sender: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seen: {
      type: Boolean,
      required: true,
      default: false,
    },
    datetime: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "messages",
  }
);

module.exports = Mongoose.model("Message", MessageSchema);
