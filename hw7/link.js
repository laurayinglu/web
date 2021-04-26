// link to the mysql database

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "cse-larry.cse.umn.edu",
  user: "C4131F20U62", // replace with the database user provided to you
  password: "3874", // replace with the database password provided to you
  database: "C4131F20U62", // replace with the database user provided to you
  port: 3306
});

con.connect(function(err) {
  if (err) {
    throw err;
  };

  console.log("Linked!");
});
    
exports.get = function() {
  return con;
}
