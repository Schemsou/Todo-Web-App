const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { json } = require("express");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("pls enter an email");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    json.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({
    email,
  });

  if (user) {
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
  const {email} = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(200).json({
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("not found");
  }
});
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get user" });
});
module.exports = {
  registerUser,
  loginUser,
  getUser,
};
