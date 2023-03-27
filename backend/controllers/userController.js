const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { json } = require("express");
const User = require("../models/userModel");
const { use } = require("react");
const { sendWelcomeEmail } = require("../emails/account");

const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("pls enter an email");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({
    email,
  });

  if (user) {
    user.token = generateToken(user._id);
    await user.save();
    sendWelcomeEmail(user.email);
    res.status(201).json({
      _id: user.id,
      email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(200).json({
      email: user.email,
      _id: user.id,
      token: generateToken(user._id),
    });
    sendWelcomeEmail(user.email);
  } else {
    res.status(400);
    throw new Error("not found");
  }
});
const getUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(400);
    throw new Error("User not authorized");
  }
  const { email } = await User.findById(req.user.id);
  res.status(200).json({
    _id: req.user.id,
    email,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getUser,
};
