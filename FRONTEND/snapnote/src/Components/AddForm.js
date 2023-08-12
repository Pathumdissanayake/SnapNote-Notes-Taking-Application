import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/AddForm.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer as ReactToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reminderDate, setReminderDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigate = useNavigate();

  const ValidateForm = () => {
    let isValid = true;

    if (!title) {
      isValid = false;
      toast.error("Enter the title for your note!");
    } else if (!content) {
      isValid = false;
      toast.error("Enter Content to create a note!!");
    }
    return isValid;
  };

  const AddNewNote = (e) => {
    e.preventDefault();

    if (ValidateForm()) {
      const newNoteData = {
        title,
        content,
        reminderDate, // Include the reminderDate in the data object
      };

      axios
        .post("http://localhost:4000/Notes/newNote", newNoteData)
        .then(() => {
          toast.success("New Note Created!");
          setTimeout(() => {
            navigate("/home");
          }, 3000); 
        })
        .catch((err) => {
          toast.error("An Error Occured : ", err);
        });
    }
  };

  return (
    <div className="add-form-body">
      <div className="add-form-box">
        <div className="padding-div">
          <div className="box-container">
            <div className="add-note-heading">
              <h1>New Note</h1>
            </div>

            <form onSubmit={AddNewNote}>
              <input
                id="title-input"
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <br />

              <textarea
                className="text-area"
                placeholder="Start writing here..."
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <br />

              <div className="btn-div">
                <button className="btns-in-add-form" type="submit">
                  Create
                </button>
                <Link to="/home">
                  <button className="btns-in-add-form" type="button" link>
                    Cancel
                  </button>
                </Link>
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ReactToastContainer />
    </div>
  );
}
