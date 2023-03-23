const asyncHandler = require("express-async-handler");

// @description Get todo
// @route GET api/todos
// @acces private after auth
const getTodo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get todo controller" });
});

const setTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("add field");
  }
  res.status(200).json({ message: "Set new Todo controller" });
});

const updateTodo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update  Todo controller ${req.params.id}` });
});
const deleteTodo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete  Todo controller ${req.params.id}` });
});
module.exports = {
  getTodo,
  setTodo,
  updateTodo,
  deleteTodo,
};
