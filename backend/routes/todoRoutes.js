const express = require("express");
const protect = require('../middleware/authMiddleware')
const router = express.Router();
const {
  getTodo,
  updateTodo,
  setTodo,
  deleteTodo,
} = require("../controllers/todoControllers");

router.route('/').get(getTodo);
router.post("/", setTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
