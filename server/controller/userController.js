const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken")
//db connection
const dbconnection = require("../db/dbConfig");

const register = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !password || !firstname || !lastname || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required information!" });
  }

  try {
    const [user] = await dbconnection.query(
      "select username, userid from users where username = ? or email = ?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already registered" });
    }

    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters!" });
    }
    // console.log(password.length);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    await dbconnection.query(
      "INSERT INTO users(username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    //send data to front end
    return res.status(StatusCodes.CREATED).json({ msg: "user registered" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try later!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter all required fields!" });
  }

  try {
    const [user] = await dbconnection.query(
      "select username, userid, password from users where email = ?",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credential" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user[0].password);
    // console.log(isMatch)
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid credential" });
    }
    const username = user[0].username
    const userid = user[0].userid
    let token = jwt.sign({ username, userid }, process.env.JWT_SECRET, { expiresIn: "1d" })
    return res.status(StatusCodes.OK).json({ msg: "user login successful", token, username })


  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try later!" });
  }
};

const checkUser = (req, res) => {
  const username = req.user.username
  const userid = req.user.userid
  return res.status(StatusCodes.OK).json({ msg: "Valid user", username, userid })
};

module.exports = {
  register,
  login,
  checkUser,
};
