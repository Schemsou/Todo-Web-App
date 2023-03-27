const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");
const User = require("../models/userModel");
const sgMail = require("@sendgrid/mail");
// @description Get todo
// @route GET api/todos
// @acces private after auth
const getTodo = asyncHandler(async (req, res) => {
  const { order } = req.body;
  const sortOrder = order === "desc" ? -1 : 1;
  const todos = await Todo.find({ user: req.user.id }).sort({
    text: sortOrder,
  });
  res.status(200).json(todos);
});

const setTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("add field");
  }
  const { text, description, date, completed, todos } = req.body;
  const todo = await Todo.create({
    text,
    description,
    date,
    completed,
    todos,
    user: req.user.id,
  });
  res.status(200).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text, description, date, completed, todos } = req.body;
  const user = await User.findById(req.user.id);

  const todo = await Todo.findById(id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  todo.text = text || todo.text;
  todo.description = description || todo.description;
  todo.date = date || todo.date;
  todo.completed = completed !== undefined ? completed : todo.completed;
  todo.todos = todos || todo.todos;
  const today = new Date();
  const end = new Date(todo.date);
  const timeDiff = Math.abs(end.getTime() - today.getTime());
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysLeft === 1) {
    const msg = {
      to: user.email,
      from: "chemseddine.sediri@gmail.com",
      subject: "Your todo is due tomorrow",
      text: `Your todo "${todo.text}" is due today. Please complete it before the end of the day.`,
    };
    sgMail.send(msg);
  }

  const updatedTodo = await todo.save();

  res.status(200).json(updatedTodo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const todo = await Todo.findById(req.params.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
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
