import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/HomePage.css";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);

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
      await axios.delete(`http://localhost:4000/Notes/delete/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      setSelectedNote(null);
    } catch (error) {
      console.log("Error deleting note:", error);
      alert(`Error deleting note: ${error.message}`);
    }
  };

  const handleEdit = (noteId) => {
    setSelectedNote(notes.find((note) => note._id === noteId));
    setEditingNoteId(noteId);
  };

  const handleEditCancel = () => {
    setEditingNoteId(null);
  };

  const handleSave = async (updatedNote) => {
    try {
      await axios.put(`http://localhost:4000/Notes/edit/${updatedNote._id}`, updatedNote);
      handleEditCancel();
      const updatedNotes = await axios.get("http://localhost:4000/Notes/notes");
      setNotes(updatedNotes.data);
    } catch (error) {
      console.log("Error updating note:", error);
      alert(`Error updating note: ${error.message}`);
    }
  };

  return (
    <div className="home-body">
      <div className="header-section-1">
        <h1 className="app-name">SNAPNOTE</h1>
      </div>

      <div className="div-home-body">
        <table className="table-display">
          <tbody>
            {notes.map((n, index) => (
              <React.Fragment key={n.id}>
                <tr className="card1" onClick={() => setSelectedNote(n)}>
                  <div className="card1-container">
                    <td className="title-column">{n.title}</td>
                  </div>
                </tr>
                {index < notes.length - 1 && (
                  <tr key={index}>
                    <td style={{ height: "5px" }}></td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {selectedNote && (
          <div className="div-for-paddding-card2">
            <div className="card2">
              <div className="card-2-padding">
                <div className="title-div">
                  {!editingNoteId || editingNoteId !== selectedNote._id ? (
                    <h3 className="title-column-display">{selectedNote.title}</h3>
                  ) : (
                    <input
                      type="text"
                      value={selectedNote.title}
                      onChange={(e) =>
                        setSelectedNote((prevNote) => ({
                          ...prevNote,
                          title: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
                <div className="icon-div">
                  {editingNoteId === selectedNote._id ? (
                    <>
                      <span className="icon save-icon" onClick={() => handleSave(selectedNote)}>
                        💾
                      </span>
                      <span className="icon cancel-icon" onClick={() => handleEditCancel()}>
                        ❌
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="icon delete-icon" onClick={() => handleDelete(selectedNote._id)}>
                        🗑️
                      </span>
                      <span className="icon edit-icon" onClick={() => handleEdit(selectedNote._id)}>
                        ✏️
                      </span>
                    </>
                  )}
                </div>
                {editingNoteId === selectedNote._id ? (
                  <textarea
                    className="content-textarea"
                    value={selectedNote.content}
                    onChange={(e) =>
                      setSelectedNote((prevNote) => ({
                        ...prevNote,
                        content: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="content-column">{selectedNote.content}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="add-new-btn-div">
        <Link to="/New-note" className="add-new-notes-btn">
          <button className="add-new-btn">+</button>
        </Link>
      </div>
    </div>
  );
}
