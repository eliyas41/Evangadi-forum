const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  user: "discord",
  database: "discord",
  host: "localhost",
  password: "KgzzRGRXE*wfGyP8",
  connectionLimit: 10,
});

let registration = `CREATE TABLE if not exists registration(
  userid int auto_increment,
  username varchar(255) not null,
  email varchar(255) not null,
  password varchar(255) not null,
  PRIMARY KEY (userid),
  UNIQUE KEY (username)
  )`;
let profile = `CREATE TABLE if not exists profile(
  user_profile_id int auto_increment,
  userid int not null,
  firstname varchar(255) not null,
  lastname varchar(255) not null,        
  PRIMARY KEY (user_profile_id),
  FOREIGN KEY (userid) REFERENCES registration(userid)
)`;

let question = `CREATE TABLE if not exists question(
  question_id int auto_increment,
  userid int not null,
  title varchar(200) not null,
  question varchar(1000) not null,
  time DateTime not null,        
  PRIMARY KEY (question_id),
  FOREIGN KEY (userid) REFERENCES registration(userid)
)`;
let answer = `CREATE TABLE if not exists answer(
  answer_id int auto_increment,
  userid int not null,
  question_id int not null,
  answer varchar(5000) not null,
  time DateTime not null,        
  PRIMARY KEY (answer_id),
  FOREIGN KEY (userid) REFERENCES registration(userid),
  FOREIGN KEY (question_id) REFERENCES question(question_id)
)`;

dbConnection.query(registration, (err, results) => {
  if (err) throw err;
  console.log("registration table created");
});
dbConnection.query(profile, (err, results) => {
  if (err) throw err;
  console.log("profile table created");
});

dbConnection.query(question, (err, results) => {
  if (err) throw err;
  console.log("question table created");
});
dbConnection.query(answer, (err, results) => {
  if (err) throw err;
  console.log("answer table created");
});

module.exports = dbConnection.promise();
