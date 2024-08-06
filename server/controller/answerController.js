const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// New Answer Handler
async function newanswer(req, res) {
  const { question_id, answer } = req.body;

  // Validation
  if (!question_id || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Not all fields have been provided!" });
  }

  try {
    // Insert data into the answer table
    const [result] = await dbConnection.query(
      `INSERT INTO answer(userid, question_id, answer, time) VALUES (?, ?, ?, ?)`,
      [req.user.userid, question_id, answer, new Date()]
    );

    return res.status(StatusCodes.OK).json({
      msg: "New Answer added successfully",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Database connection error" });
  }
}

// Get Answers by Question ID Handler
async function getanswers(req, res) {
  const { question_id } = req.params;

  try {
    const [results] = await dbConnection.query(
      `SELECT answer.answer, answer.time, registration.username 
       FROM answer 
       LEFT JOIN registration ON answer.userid = registration.userid 
       WHERE answer.question_id = ? 
       ORDER BY answer.time ASC`,
      [question_id]
    );

    if (results.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No answers found for this question" });
    }

    return res.status(StatusCodes.OK).json({ data: results });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Database connection error" });
  }
}

// Update Answer Handler
async function updateanswer(req, res) {
  const { answer_id } = req.params;
  const { answer } = req.body;

  // Validation
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Not all fields have been provided!" });
  }

  try {
    const { userid } = req.user; // Extracting userid from req.user
    const [result] = await dbConnection.query(
      `UPDATE answer SET answer = ? WHERE answer_id = ? AND userid = ?`,
      [answer, answer_id, userid]
    );

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Answer not found or unauthorized" });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Answer updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Database connection error" });
  }
}

// Delete Answer Handler
async function deleteanswer(req, res) {
  const { answer_id } = req.params;

  try {
    const { userid } = req.user; // Extracting userid from req.user
    const [result] = await dbConnection.query(
      `DELETE FROM answer WHERE answer_id = ? AND userid = ?`,
      [answer_id, userid]
    );

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Answer not found or unauthorized" });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Answer deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Database connection error" });
  }
}

// Exporting all methods
module.exports = {
  newanswer,
  getanswers,
  updateanswer,
  deleteanswer,
};
