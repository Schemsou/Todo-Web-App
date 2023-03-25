const express = require("express");
const router = express.Router();
const {
  getTodo,
  updateTodo,
  setTodo,
  deleteTodo,
} = require("../controllers/todoControllers");
const { protect } = require("../middleware/authMiddleware");


router.route("/").get(protect, getTodo);
router.route("/").post(protect, setTodo);
router.route("/:id").put(protect, updateTodo);
router.route("/:id").delete(protect, deleteTodo);

module.exports = router;
