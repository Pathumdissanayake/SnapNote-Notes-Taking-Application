import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Login.css";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/User/login", { email, password })
      .then((result) => {
        if (result.data.message === "Success") {
          toast.success("Login Successfully!!");
          setTimeout(() => {
            navigate("/home");
          }, 3000); // Adjust the time in milliseconds as needed (e.g., 3000ms = 3 seconds)
        } else {
          toast.error("Register first!!");
        }
      });
  };

  return (
    <div className="login-body">
      <div className="div-for-login-box">
        <div className="login">
          <div className="login-heading-div">
            <h2>Login</h2>
          </div>

          <div className="login-form-container-div">
            <form onSubmit={handleLoginFormSubmit}>
              <div>
                <label className="lable-login">Email:</label>
                <input
                  className="login-input-field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="lable-login">Password :</label>
                <input
                  className="login-input-field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="btns-div">
                <button type="submit" className="login-btn">
                  Login
                </button>
                <Link to="/register">
                  <button type="button" className="register-btn">
                    Register
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ReactToastContainer />
    </div>
  );
};

export default Login;
