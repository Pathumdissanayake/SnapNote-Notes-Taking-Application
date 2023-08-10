import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/HomePage.css";

export default function HomePage() {
  const [notes, setNotes] = useState([]);

  //read~notes
  useEffect(() => {
    function getNotes() {
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
      <div className="header-div">
        <div className="header-section-1">
        <h1 className="app-name">SNAPNOTE</h1>
        <h2 className="app-tagline"> Your Digital Note-Taking Companion</h2>
        </div>
        
      </div>

      <div className="header-section-2">
        {/*user icon ekak daanna*/}
      </div>
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
      <div className="div2">{/* eka note ekak click kalama methnt enn oni */}</div>
      <div className="add-new-btn-div">
        <Link to="/New-note" className="add-new-notes-btn">
          <button className="add-new-btn">+</button>
        </Link>
      </div>
    </div>
  );
}
