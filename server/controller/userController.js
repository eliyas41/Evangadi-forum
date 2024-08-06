// Required modules and db connection
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// Register user
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all the required fields" });
  }

  try {
    // Check if user already exists
    const [existingUser] = await dbConnection.query(
      "SELECT username, userid FROM registration WHERE username=? OR email=?",
      [username, email]
    );
    if (existingUser.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already exists" });
    }
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into registration table
    const [result] = await dbConnection.query(
      "INSERT INTO registration(username, email, password) VALUES (?,?,?)",
      [username, email, hashedPassword]
    );

    // Insert user profile into profile table
    await dbConnection.query(
      "INSERT INTO profile(userid, firstname, lastname) VALUES (?,?,?)",
      [result.insertId, firstname, lastname]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}

// Get user by ID
async function getUserById(req, res) {
  const userId = req.params.id;
  try {
    const [result] = await dbConnection.query(
      `SELECT registration.userid, username, email, firstname, lastname 
       FROM registration 
       LEFT JOIN profile ON registration.userid = profile.userid 
       WHERE registration.userid = ?`,
      [userId]
    );
    if (result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }
    return res.status(StatusCodes.OK).json({ data: result[0] });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Database connection error" });
  }
}

// Login user
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter all the required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT userid, username, password FROM registration WHERE email = ?",
      [email]
    );
    if (user.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user[0].userid }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(StatusCodes.OK).json({
      msg: "User logged in successfully",
      token,
      user: {
        id: user[0].userid,
        display_name: user[0].username,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}

// Check user (middleware)
async function checkUser(req, res) {
  const { username, userid } = req.user;
  res.status(StatusCodes.OK).json({ msg: "Valid user", username, userid });
}

// Exporting all methods
module.exports = {
  register,
  getUserById,
  login,
  checkUser,
};
