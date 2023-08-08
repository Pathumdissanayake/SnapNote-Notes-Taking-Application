import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HomePage.css';

export default function HomePage() {
  return (
    <div className='home-body'>
      <Link to="/New-note" className='add-new-notes-btn'>
        <button>+</button>
      </Link>
    </div>
  );
}