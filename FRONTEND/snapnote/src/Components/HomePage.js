import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/HomePage.css";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cancelimg from "../Images/cancel.png";
import deleteimg from "../Images/delete.png";
import editimg from "../Images/edit.png";
import saveimg from "../Images/save.png";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteSelected, setNoteSelected] = useState(false);

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await axios.get("http://localhost:4000/Notes/notes");
        setNotes(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getNotes();
  }, []);

  const showDeleteConfirmation = (noteId) => {
    // Custom confirmation toast for delete
    toast.info(
      <div>
        <p className="delete-confiramation-box-text">
          Are you sure you want to delete this note?
        </p>
        <button className="confirm-btns" onClick={() => handleDelete(noteId)}>
          Yes
        </button>
        <button className="confirm-btns" onClick={toast.dismiss}>
          No
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleDelete = async (noteId) => {
    try {
      await axios.delete(`http://localhost:4000/Notes/delete/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      setSelectedNote(null);
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error(`Error deleting note: ${error.message}`);
    }
  };

  const handleEdit = (noteId) => {
    setSelectedNote(notes.find((note) => note._id === noteId));
    setEditingNoteId(noteId);
    setNoteSelected(true);
  };

  const handleEditCancel = () => {
    setEditingNoteId(null);
  };

  const handleSave = async (updatedNote) => {
    try {
      await axios.put(
        `http://localhost:4000/Notes/edit/${updatedNote._id}`,
        updatedNote
      );
      handleEditCancel();
      const updatedNotes = await axios.get("http://localhost:4000/Notes/notes");
      setNotes(updatedNotes.data);
    } catch (error) {
      console.log("Error updating note:", error);
      toast.error(`Error updating note: ${error.message}`);
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
                    <h3 className="title-column-display">
                      {noteSelected
                        ? "Select a note to view its content"
                        : selectedNote.title}
                    </h3>
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
                      <span
                        className="icon save-icon"
                        onClick={() => handleSave(selectedNote)}
                      >
                        <img src={saveimg} className="icons" />
                      </span>
                      <span
                        className="icon cancel-icon"
                        onClick={() => handleEditCancel()}
                      >
                        <img src={cancelimg} className="icons" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className="icon edit-icon"
                        onClick={() => handleEdit(selectedNote._id)}
                      >
                        <img src={editimg} className="icons" />
                      </span>
                      <span
                        className="icon delete-icon"
                        onClick={() => showDeleteConfirmation(selectedNote._id)}
                      >
                        <img src={deleteimg} className="icons" />
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
      <ReactToastContainer />
    </div>
  );
}
