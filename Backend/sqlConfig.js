import mysql from "mysql2"
import dotenv from 'dotenv'
dotenv.config()

const poolConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABSE
};

let db = mysql.createPool(poolConfig);

db.on("connection", function (_conn) {
  if (_conn) {
    console.log("\n********************************************\n");
    console.log("Connection to the Database via ", _conn.threadId);
    console.log("\n********************************************\n");
  }
});

export default db
