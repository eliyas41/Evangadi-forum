const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
  user: process.env.USER1,
  database: process.env.DATABASE,
  host: "193.203.166.19",
  password: process.env.PASSWORD,
  connectionLimit: 10,
});
// dbconnection.execute("select 'test' ", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });

module.exports = dbconnection.promise();
