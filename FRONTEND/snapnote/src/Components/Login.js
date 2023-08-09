import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:4000/User/login", { email, password })
      .then((result) => {
        if (result.data === "Success") {
          navigate("/home");
          alert("Login Successfully!!");
        }
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginFormSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <button type="submit">Login</button>
          <Link to="/register">
            <button type="button">Register</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
