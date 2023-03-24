const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "pls add your email"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
