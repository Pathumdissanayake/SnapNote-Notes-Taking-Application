import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/AddForm.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        reminderDate, // Include the reminderDate in the data object
      };

      axios
        .post("http://localhost:4000/Notes/newNote", newNoteData)
        .then(() => {
          alert("New Note Created!");
          navigate("/home");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const setReminder = () => {
    console.log("setReminder called");
    setShowDatePicker(true);
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
              <div className="btn-div">
                <button
                  className="btns-in-add-form"
                  type="button"
                  onClick={setReminder}
                >
                  + Set Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showDatePicker && (
        <div className="date-time-picker">
          <DatePicker
            selected={reminderDate}
            onChange={(date) => setReminderDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select reminder date and time"
          />
        </div>
      )}
    </div>
  );
}
