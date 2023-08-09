import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddForm() {
  const [title, setTitle] = useState(""); // State for title input
  const [content, setContent] = useState(""); // State for content textarea

  const ValidateForm = () => {
    let isValid = true;

    if (!title) {
      isValid = false;
      alert("Enter the title for your note!");
    } else if (!content) {
      isValid = false;
      alert("Enter Content to create a note!!");
    }
    return isValid;
  };

  const AddNewNote = (e) => {
    e.preventDefault();

    if (ValidateForm()) {
      const newNoteData = {
        title,
        content,
      };

      axios
        .post("http://localhost:4000/Notes/newNote", newNoteData)
        .then(() => {
          alert("New Note Created!");
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <div className="add-form-body">
      <h1>New Note</h1>
      <form onSubmit={AddNewNote}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title} // Bind input value to state
          onChange={(e) => setTitle(e.target.value)} // Update state on change
        />

        <br />

        <textarea
          placeholder="Start writing here"
          name="content"
          value={content} // Bind textarea value to state
          onChange={(e) => setContent(e.target.value)} // Update state on change
        />

        <br />
        <button type="submit">Create</button>
        <Link to="/"><button type="button" link >Cancel</button></Link>
        <br />
        <button type="button">+ Set Reminder</button>
      </form>
    </div>
  );
}
