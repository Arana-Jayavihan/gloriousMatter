// src/components/StudyNoteManagement.js
import React, { useEffect, useState } from "react";
import axiosInstance from "./axios";
import { DATA } from './API';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const getAllNotes = async () => {
    const userEmail = JSON.parse(sessionStorage.getItem("user")).email;
    const data = {
      userEmail,
    };
    const response = await axiosInstance.post("/getallnotes", data);
    if (response.status == 200) {
      sessionStorage.setItem("notes", JSON.stringify(response.data.notes));
    }
    else if (response.status == 404){
        console.log("no notes")
        sessionStorage.setItem('notes', "tres")
    }
  };
  useEffect(() => {
    getAllNotes();
    const rawNotes = sessionStorage.getItem("notes")
    console.log(rawNotes)
    if (rawNotes != undefined){
        console.log("hello")
        setNotes(JSON.parse(rawNotes));
    }
  }, []);

  // Form state for new notes
  const [newNote, setNewNote] = useState({
    name: "",
    file: null,
  });

  const [filter, setFilter] = useState({
    category: "",
    name: "",
    tags: "",
  });

  // Handle new note submission
  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    const userEmail = JSON.parse(sessionStorage.getItem("user")).email;
    // Logic to handle file upload and save new note

    const data = new FormData();
    data.append("noteName", newNote.name);
    data.append("userEmail", userEmail);
    data.append("file", newNote.file);

    console.log(data);

    const response = await axiosInstance.post(`/notesubmit`, data);

    if (response.status == 201) {
      alert(response.data.message);
      sessionStorage.setItem("notes", JSON.stringify(response.data.notes));
      window.location.reload();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  const handleNoteDelete = async (noteID) => {
    console.log(noteID)
    const data = {
        noteID
    }

    const response = await axiosInstance.post('/notedelete', data)
    if (response.status == 200){
        alert(response.data.message)
        sessionStorage.setItem("notes", JSON.stringify(response.data.notes));
        window.location.reload()
    }
    else {
        alert(response.data.message)
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleReviewDownload = (noteID) => {
    window.location.href(`${DATA}`)
  }

  // Filter notes based on category, name, and date
  const filteredNotes = notes?.filter((note) => {
    return (
      (filter.category === "" ||
        note.noteCategory.toLowerCase().includes(filter.category.toLowerCase())) &&
      (filter.name === "" ||
        note.noteName.toLowerCase().includes(filter.name.toLowerCase())) &&
      (filter.tags === "" ||
        note.noteTags.toLowerCase().includes(filter.tags.toLowerCase()))
    );
  });

  return (
    <div className="study-note-management">
      <div style={{ margin: "3rem" }}>
        <h2>Study Notes</h2>

        {/* Filter Section */}
        <div className="filter-section">
          <input
            type="text"
            placeholder="Filter by name"
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            placeholder="Filter by category"
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            placeholder="Filter by tags"
            name="tags"
            value={filter.tags}
            onChange={handleFilterChange}
          />
        </div>
        <br />
        <br />
        {/* Table View */}
        <table className="notes-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes?.map((note) => (
              <tr key={note.id} onClick={() => openNoteDetails(note.id)}>
                <td>{note.noteName}</td>
                <td>{note.noteCategory}</td>
                <td>{note.status}</td>
                <td>
                  <button onClick={(e) => handleNoteDelete(note.noteID)}>Delete</button>
                  <button disabled={note.noteCategory == "Analysis Required"? true : false} onClick={(e) => window.location.href=`${DATA}${note.noteReviewPath}`}>Download Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form to submit new notes */}
      <div className="new-note-form">
        <h3>Submit New Study Note</h3>
        <form onSubmit={handleNoteSubmit}>
          <input
            type="text"
            placeholder="Note Name"
            value={newNote.name}
            onChange={(e) => setNewNote({ ...newNote, name: e.target.value })}
            required
          />
          <input
            type="file"
            onChange={(e) =>
              setNewNote({ ...newNote, file: e.target.files[0] })
            }
            required
          />
          <button type="submit">Submit Note</button>
        </form>
      </div>
    </div>
  );
};

export default Notes;
