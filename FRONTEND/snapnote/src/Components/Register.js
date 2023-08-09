import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:4000/User/check-email/${email}`
      );

      if (response.data.exists) {
        alert("Email already registered. Please use a different email.");
      } else {
        axios
          .post("http://localhost:4000/User/login", {
            firstName,
            lastName,
            email,
            password,
          })
          .then(() => {
            alert("Registration Success!!");
            navigate("/");
          })
          .catch((err) => console.log(err));

        // Reset the form after submission
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
      }
    } catch (err) {
      console.log(err);
    }
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
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Register</button>
        <Link to="/">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default Register;
