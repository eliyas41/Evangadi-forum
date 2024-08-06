const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Ask Question
async function newquestion(req, res) {
  const { title, question } = req.body;

  // Validation
  if (!title || !question) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Not all fields have been provided!" });
  }
  if (title.length > 200) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Title length cannot be greater than 200 characters!" });
  }

  try {
    const { userid } = req.user; // Extracting userid from req.user
    const [result] = await dbConnection.query(
      `INSERT INTO question(userid, title, question, time) VALUES (?, ?, ?, ?)`,
      [userid, title, question, new Date()]
    );
    return res.status(StatusCodes.OK).json({
      msg: "New Question added successfully",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Database connection error" });
  }
}

// Get Questions
async function getquestions(req, res) {
  try {
    const [results] = await dbConnection.query(
      `SELECT question.question_id, registration.userid, registration.username, question.title, question.question, question.time 
       FROM question 
       LEFT OUTER JOIN registration ON question.userid = registration.userid 
       ORDER BY question.time DESC`
    );
    if (results.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Record not found" });
    }
    return res.status(StatusCodes.OK).json({ data: results });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Database connection error" });
  }
}

// Get Question by ID
// Get Question by ID
async function getquestionbyid(req, res) {
  const { question_id } = req.params; // Use req.params for URL parameters

  try {
    const [results] = await dbConnection.query(
      `SELECT question.question_id, registration.userid, registration.username, question.title, question.question, question.time 
       FROM question 
       LEFT OUTER JOIN registration ON question.userid = registration.userid 
       WHERE question.question_id = ?`, // Use table_name.column_name for clarity
      [question_id]
    );
    if (results.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Record not found" });
    }
    return res.status(StatusCodes.OK).json({ data: results[0] });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Database connection error" });
  }
}

// Update Question
async function updatequestion(req, res) {
  const { question_id } = req.params;
  const { title, question } = req.body;

  // Validation
  if (!title || !question) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Not all fields have been provided!" });
  }
  if (title.length > 200) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Title length cannot be greater than 200 characters!" });
  }

  try {
    const { userid } = req.user; // Extracting userid from req.user
    const [result] = await dbConnection.query(
      `UPDATE question SET title = ?, question = ? WHERE question_id = ? AND userid = ?`,
      [title, question, question_id, userid]
    );

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found or unauthorized" });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Question updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Database connection error" });
  }
}

// Delete Question
async function deletequestion(req, res) {
  const { question_id } = req.params;

  try {
    const { userid } = req.user; // Extracting userid from req.user
    const [result] = await dbConnection.query(
      `DELETE FROM question WHERE question_id = ? AND userid = ?`,
      [question_id, userid]
    );

    if (result.affectedRows === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found or unauthorized" });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Question deleted successfully",
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
  newquestion,
  getquestions,
  getquestionbyid,
  updatequestion,
  deletequestion,
};
