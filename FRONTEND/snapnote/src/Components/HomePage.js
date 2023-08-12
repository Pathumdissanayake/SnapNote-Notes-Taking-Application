import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/HomePage.css";
import { ToastContainer as ReactToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        toast.error(error.message);
      }
    }
    getNotes();
  }, []);

  const handleDelete = (noteId) => {
    toast.info(
      "Are you sure you want to delete this note?",
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        closeButton: true,
        onClose: () => {
          performDelete(noteId);
        },
        render: ({ closeToast }) => (
          <div>
            <span>Are you sure you want to delete this note?</span>
            <button onClick={() => { closeToast(); }}>Yes</button>
            <button onClick={() => { closeToast(); }}>No</button>
          </div>
        ),
      }
    );
  };

  const performDelete = async (noteId) => {
    try {
      await axios.delete(`http://localhost:4000/Notes/delete/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      setSelectedNote(null);
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error(`Error deleting note: ${error.message}`);
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
      <ReactToastContainer />
    </div>
  );
}
