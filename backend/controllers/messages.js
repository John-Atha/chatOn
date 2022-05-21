const Message = require("../models/Message");
const express = require("express");
const getRequestUser = require("../helpers/getRequestUser");
const Mongoose = require("mongoose");
const User = require("../models/User");

const ObjectId = Mongoose.Types.ObjectId;

const router = express.Router();

router.get("/", async (req, res) => {
  const requestUser = getRequestUser(req);
  if (!requestUser) {
    res.status(401).send("Unauthorized");
    return;
  }
  const messages = await Message.find({
    $or: [
      { receiver: new ObjectId(requestUser.id) },
      { sender: new ObjectId(requestUser.id) },
    ],
  }).sort([["datetime", -1]]);
  res.send(messages);
});

router.get("/contacts", async (req, res) => {
  const requestUser = getRequestUser(req);
  if (!requestUser) {
    res.status(401).send("Unauthorized");
    return;
  }
  const messages = await Message.find({
    $or: [
      { receiver: new ObjectId(requestUser.id) },
      { sender: new ObjectId(requestUser.id) },
    ],
  }).sort([["datetime", -1]]);
  console.log({ messages });
  const contacts = {};
  messages.forEach(({ receiver, sender, ...message }) => {
    if (receiver === requestUser.id) {
      if (!contacts[sender]) {
        contacts[sender] = {
          receiver,
          sender,
          ...message,
        };
      }
    } else {
      if (!contacts[receiver]) {
        contacts[receiver] = {
          receiver,
          sender,
          ...message,
        };
      }
    }
  });
  console.log({ contacts });
  const result = await Promise.all(
    Object.entries(contacts).map(async ([key, val]) => {
      const user = await User.findById(key);
      console.log({ user });
      console.log({ val });
      if (!user) {
        return null;
      }
      return {
        user,
        ...val._doc,
      };
    })
  );
  console.log({ result });
  res.send(result);
});

router.get("/:username", async (req, res) => {
  const requestUser = getRequestUser(req);
  if (!requestUser) {
    res.status(401).send("Unauthorized");
    return;
  }
  const otherUser = await User.findOne({ username: req.params.username });
  if (!otherUser) {
    res.status(404).send(`User ${req.params.username} does not exist`);
    return;
  }
  const messages = await Message.find({
    $or: [
      {
        sender: new ObjectId(requestUser.id),
        receiver: new ObjectId(otherUser._id),
      },
      {
        receiver: new ObjectId(requestUser.id),
        sender: new ObjectId(otherUser._id),
      },
    ],
  }).sort([["datetime", -1]]);
  res.send(messages);
});

router.post("/", async (req, res) => {
  const requestUser = getRequestUser(req);
  if (!requestUser) {
    res.status(401).send("Unauthorized");
    return;
  }
  const { text, receiver } = req.body;
  const receiverUser = await User.findOne({ username: receiver });
  if (!receiverUser) {
    res.status(404).send(`User '${receiver}' does not exist`);
    return;
  }
  return Message.create({
    text,
    receiver: new ObjectId(receiverUser._id),
    sender: new ObjectId(requestUser.id),
    datetime: new Date(),
  })
    .then((msg) => {
      res.send(msg);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
});

module.exports = router;
