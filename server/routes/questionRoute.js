const express = require("express");
const router = express.Router();

// Authentication middleware
const authMiddleware = require("../middleware/authMiddlewares");

// Question controller
const {
  newquestion,
  getquestions,
  getquestionbyid,
  updatequestion,
  deletequestion,
} = require("../controller/questionController");

// Route to ask a new question
router.post("/newquestion", authMiddleware, newquestion);

// Route to get all questions
router.get("/getquestions", authMiddleware, getquestions);

// Route to get a question by ID using URL parameters
router.get("/getquestionbyid/:question_id", authMiddleware, getquestionbyid);
// Route to update a question by ID
router.put("/updatequestion/:question_id", authMiddleware, updatequestion);

// Route to delete a question by ID
router.delete("/deletequestion/:question_id", authMiddleware, deletequestion);

module.exports = router;
