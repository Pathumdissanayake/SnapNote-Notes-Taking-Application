import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [currUserName, setCurrUserName] = useState('');
  const [currPwd, setCurrPwd] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    // You can add your authentication logic here

    // Get the values from the form
  const username = e.target.username.value;
  const password = e.target.password.value;



  if (username === validUsername && password === validPassword) {
    // Authentication successful, you can redirect or perform other actions
    alert("Authentication successful");
  } else {
    // Authentication failed, you can show an error message
    alert("Authentication failed");
  }
  };

  // const handleGoogleLogin = () => {
  //   // You can implement Google login logic here
  // };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginFormSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <button type="submit">Login</button>
          <Link to="/register"><button type="button">Register</button></Link>
        </div>
      </form>
      {/* <div>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div> */}
    </div>
  );
};

export default Login;
