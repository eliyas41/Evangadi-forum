const express = require("express");
const router = express.Router();

// Authentication middleware
const authMiddleware = require("../middleware/authMiddlewares");

// Answer controller
const {
  newanswer,
  getanswers,
  updateanswer,
  deleteanswer,
} = require("../controller/answerController");

// Route to add a new answer
router.post("/newanswer", authMiddleware, newanswer);

// Route to get answers by question ID
router.get("/getanswers/:question_id", authMiddleware, getanswers);
// Route to update an answer by ID
router.put("/updateanswer/:answer_id", authMiddleware, updateanswer);

// Route to delete an answer by ID
router.delete("/deleteanswer/:answer_id", authMiddleware, deleteanswer);

module.exports = router;
