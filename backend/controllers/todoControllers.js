const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");

// @description Get todo
// @route GET api/todos
// @acces private after auth
const getTodo = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

const setTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("add field");
  }
  const todo = await Todo.create({
    text: req.body.text,
    description: req.body.description,
    date: req.body.date,
  });
  res.status(200).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("not found");
  }
  const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateTodo);
});
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("not found");
  }
  await Todo.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTodo,
  setTodo,
  updateTodo,
  deleteTodo,
};
