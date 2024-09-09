import db from "../sqlConfig.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import shID from "shortid";
dotenv.config();

export const noteSubmit = (req, res) => {
  try {
    const data = req.body;
    const file = req.file;
    const noteID = shID.generate();

    console.log(data);

    const insertQuery =
      `INSERT INTO notes (noteID, noteName, noteCategory, notePath, noteUserEmail, status) VALUES (` +
      db.escape(noteID) +
      ", " +
      db.escape(data.noteName) +
      ", " +
      db.escape("Analysis Required") +
      ", " +
      db.escape(file.filename) +
      ", " +
      db.escape(data.userEmail) +
      ", " +
      db.escape("Pending") +
      ")";

    db.query(insertQuery, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          message: "Internal Server ERROR",
        });
      }
      if (result) {
        const selectQuery =
          `SELECT * FROM notes WHERE noteUserEmail=` +
          db.escape(data.userEmail);
        db.query(selectQuery, (error, result) => {
          if (result && result.length > 0) {
            console.log(result);
            res.status(201).json({
              message: "Note Submitted For Analysis",
              notes: result,
            });
          } else {
            res.status(404).json({
              message: "No Study Notes Found",
            });
          }
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

export const getAllNotes = (req, res) => {
  try {
    const data = req.body;
    const selectQuery =
      `SELECT * FROM notes WHERE noteUserEmail=` + db.escape(data.userEmail);
    db.query(selectQuery, (error, result) => {
      if (result && result.length > 0) {
        res.status(200).json({
            message: "All notes fetched",
            notes: result
        })
      } else {
        res.status(404).json({
          message: "No Study Notes Found",
          notes: []
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

export const deleteNote = (req, res) => {
  try {
    const data = req.body
    const deleteQuery = `DELETE FROM notes WHERE noteID=` + db.escape(data.noteID)
    db.query(deleteQuery, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({
              message: "Internal Server ERROR",
            });
          }
        if (result) {
            res.status(200).json({
                message: "Note Deleted Successfully"
            })
        }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server ERROR",
    });
  }
};
