const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    text: {
      type: String,
      required: [true, "please enter a todo"],
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      validate: {
        validator: function (v) {
          return v == null || v >= Date.now();
        },
        message: "End date must be in the future",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
