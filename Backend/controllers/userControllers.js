import db from "../sqlConfig.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const userSignUp = (req, res) => {
  try {
    const data = req.body;
    const insertQuery =
      `INSERT INTO users (email, firstname, lastname, hashedPass) VALUES (` +
      db.escape(data.email) +
      ", " +
      db.escape(data.firstname) +
      ", " +
      db.escape(data.lastname) +
      ", " +
      db.escape(data.password) +
      ")";
    db.query(insertQuery, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          message: "Internal Server ERROR",
        });
      }
      if (result) {
        res.status(201).json({
          message: "User Creation Success",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server ERROR",
    });
  }
};

export const userLogin = (req, res) => {
  try {
    const data = req.body;
    const searchQuery = `SELECT * FROM users WHERE email=` + db.escape(data.email);
    db.query(searchQuery, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          message: "Internal Server ERROR",
        });
      }
      if (result) {
		const queryData = result[0]
		if (queryData.hashedPass == data.password){
			const token = jwt.sign(
			  { email: queryData.email },
			  process.env.JWT_SECRET,
			  { expiresIn: "2h" }
			);
			res.status(200).json({
				message: "Authentication Success",
				user: {
					email: queryData.email,
					firstname: queryData.firstname,
					lastname: queryData.lastname
				},
				token: token
			})
		}
		else {
			res.status(400).json({
				message: "Authentication Failure"
			})
		}
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server ERROR",
    });
  }
};
