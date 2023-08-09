import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here, you can implement the logic to send the registration data to the server
    // using APIs or any other method.

    console.log('Registration data:', {
      email,
      firstName,
      lastName,
      password,
    });

    // Reset the form after submission
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
<br></br>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
<br></br>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
<br></br>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
<br></br>
        <button type="submit">Register</button>
        <Link to="/"><button type="button">Cancel</button></Link>
      </form>
    </div>
  );
};

export default Register;
