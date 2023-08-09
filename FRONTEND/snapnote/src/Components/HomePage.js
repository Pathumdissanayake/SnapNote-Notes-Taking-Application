import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/HomePage.css";

export default function HomePage() {
  const [notes, setNotes] = useState([]);

  //read
  useEffect(() => {
    function getNotes() {
      //jwt token
      axios
        .get("http://localhost:4000/Notes/notes")
        .then((res) => {
          setNotes(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getNotes();
  }, []);

  return (
    <div className="home-body">
      <div className="div1">
        <table>
          <tbody>
            {notes.map((n) => (
              <React.Fragment key={n.id}>
                <tr>
                  <td colSpan="2" className="title-column">
                    {n.title}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="content-column">
                    {n.content}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="div2">{/* Additional content for div2 */}</div>
      <div className="add-new-btn-div">
        <Link to="/New-note" className="add-new-notes-btn">
          <button>+</button>
        </Link>
      </div>
    </div>
  );
}
