import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Styles/HomePage.css';

export default function HomePage() {

  const [notes, setNotes] = useState([]);

  //read
  useEffect(() => {
    function getNotes() {
      //jwt token
      axios.get("http://localhost:4000/Notes/notes").then((res) => {
        setNotes(res.data);
      }).catch((err) => {
        alert(err.message);
      });
    }
    getNotes();
  },[]);


  return (
    <div className='home-body'>
      <div className='div1'>
      <table>
  <tbody>
    {notes.map((n) => (
      <tr key={n.id}>
        <th className='title-column'>{n.title}</th>
        <td className='content-column'>{n.content}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
      <div className='div2'>

      </div>
      <div className='add-new-btn-div'>
      <Link to="/New-note" className='add-new-notes-btn'>
        <button>+</button>
      </Link>
      </div>
    </div>
  );
}