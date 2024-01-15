import React, { useState, useEffect } from "react";
import "./auth.css";

const credential = {
  username: "user",
  password: "pass",
};

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
      setLoggedIn(true);
      setUsername(storedUsername);
      setPassword(storedPassword);
    }
  }, []);

  const handleLogin = () => {
    if (username === credential.username && password === credential.password) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.clear();

    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <h1>Auth</h1>
      <div className="body">
        {isLoggedIn ? (
          <div>
            <p>selamat datang</p>
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="input-container">
            <div className="input">
              <label>Username: </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input">
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="button" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;

