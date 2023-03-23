const express = require("express");
const router = express.Router();
const {
  getTodo,
  updateTodo,
  setTodo,
  deleteTodo,
} = require("../controllers/todoControllers");

router.get("/", getTodo);
router.post("/", setTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
