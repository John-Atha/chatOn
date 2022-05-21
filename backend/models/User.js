const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    bio: {
      type: String,
      required: false,
    },
    lastActiveAt: {
      type: Date,
      required: false,
    },
  },
  {
    collection: "users",
  }
);

module.exports = Mongoose.model("User", UserSchema);
