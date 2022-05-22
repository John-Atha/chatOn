const User = require("../models/User");
const express = require("express");
const JsonWebToken = require("jsonwebtoken");
const Bcrypt = require("bcryptjs");
const getRequestUser = require("../helpers/getRequestUser");

const getTokenPayload = (user) => {
  return {
    id: user._id,
    username: user.username,
  };
};

const router = express.Router();

router.get("/logged", async (req, res) => {
  const requestUser = getRequestUser(req);
  if (!requestUser) {
    return res.status(401).send("Unauthorized");
  }
  const { id } = requestUser;
  const user = await User.findById(id);
  if (!user) {
    res.status(401).send("Unauthorized");
  } else {
    res.send(user);
  }
});

router.post("/signup", async (req, res) => {
  const { password, confirmation } = req.body;
  if (!password || password !== confirmation) {
    res.status(400).send(`Password and confirmation do not match`);
    return;
  }
  console.log({ body: req.body });
  return User.create({
    ...req.body,
    password: Bcrypt.hashSync(password),
  })
    .then((user) => {
      const token = JsonWebToken.sign(
        getTokenPayload(user),
        process.env.SECRET_KEY
      );
      const {password, ...userFields} = user._doc;
      res.json({ token, user: userFields });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    res.status(404).send(`User '${username}' does not exist`);
    return;
  }
  const isPasswordCorrect = Bcrypt.compareSync(password || "", user.password);
  if (!isPasswordCorrect) {
    res.status(404).send("Invalid credentials");
  } else {
    const token = JsonWebToken.sign(
      getTokenPayload(user),
      process.env.SECRET_KEY
    );
    const {password, ...userFields} = user._doc;
    res.json({ token, user: userFields });
  }
});

router.get("/", async (req, res) => {
  console.log("test");
  try {
    const users = await User.find();
    res.send(users);
    return;
  } catch (err) {
    console.log({ err });
    res.json({ err });
  }
});

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404).send(`User '${username}' does not exist`);
    return;
  }
  res.send(user);
});

module.exports = router;
