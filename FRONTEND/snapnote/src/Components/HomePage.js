import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/HomePage.css";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await axios.get("http://localhost:4000/Notes/notes");
        setNotes(response.data);
      } catch (error) {
        alert(error.message);
      }
    }
    getNotes();
  }, []);

  const handleDelete = async (noteId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this note?");
    if (!shouldDelete) {
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:4000/Notes/delete/${noteId}`);
      if (response.status === 200) {
        // Remove the deleted note from the local state
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
        setSelectedNote(null); // Clear the selected note
  
        // You can also refresh the notes from the backend to ensure consistency
        const updatedNotes = await axios.get("http://localhost:4000/Notes/notes");
        setNotes(updatedNotes.data);
      } else {
        console.log("Note not deleted:", response.data);
      }
    } catch (error) {
      console.log("Error deleting note:", error);
      alert(`Error deleting note: ${error.message}`);
    }
  };
  
   

  const handleEdit = (noteId) => {
    console.log(`Editing note with ID: ${noteId}`);
  };

  return (
    <div className="home-body">
      <div className="header-div">
        <div className="header-section-1">
          <h1 className="app-name">SNAPNOTE</h1>
          <h2 className="app-tagline">Your Digital Note-Taking Companion</h2>
        </div>
      </div>

      <div className="div-home-body">
        <div className="div1">
          <table className="table-display">
            <tbody>
              {notes.map((n, index) => (
                <React.Fragment key={n.id}>
                  <tr className="card" onClick={() => setSelectedNote(n)}>
                    <td className="title-column">{n.title}</td>
                  </tr>
                  {index < notes.length - 1 && (
                    <tr>
                      <td style={{ height: "5px" }}></td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="div2">
          {selectedNote && (
            <div className="card2">
              <div className="icon-and-title-div">
                <div className="title-div">
                  <h3 className="title-column-display">{selectedNote.title}</h3>
                </div>

                <div className="icon-div">
                  <span
                    className="icon delete-icon"
                    onClick={() => handleDelete(selectedNote._id)}
                  >
                    🗑️
                  </span>

                  <span
                    className="icon edit-icon"
                    onClick={() => handleEdit(selectedNote.id)}
                  >
                    ✏️
                  </span>
                </div>
              </div>
              <p className="content-column">{selectedNote.content}</p>
            </div>
          )}
        </div>
      </div>

      <div className="add-new-btn-div">
        <Link to="/New-note" className="add-new-notes-btn">
          <button className="add-new-btn">+</button>
        </Link>
      </div>
    </div>
  );
}
