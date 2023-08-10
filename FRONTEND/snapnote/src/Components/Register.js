import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css";

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
    <div className="reg-body">
      <div className="div-for-reg-box">
      <div className="reg">
      <div className="reg-heading">
      <h2>Registration Form</h2>
      </div>
      <div className="reg-form-container">
      <form onSubmit={handleSubmit}>
        <label className="lable-reg">First Name:</label>
        <input
        className="reg-input-field"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <br></br>
        <label className="lable-reg">Last Name:</label>
        <input
        className="reg-input-field"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <br></br>
        <label className="lable-reg">Email:</label>
        <input
        className="reg-input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br></br>
        <label className="lable-reg">Password:</label>
        <input
        className="reg-input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br></br>
        <div className="btns-div">
        <button type="submit" className="reg-register">Register</button>
        <Link to="/">
          <button type="button" className="reg-cancel">Cancel</button>
        </Link>
        </div>
      </form>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Register;
