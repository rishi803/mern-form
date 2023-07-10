import "./App.css";
import Home from "./components/homepage/Homepage";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setLoginUser] = useState({});

  // Check if a user token or identifier exists in local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoginUser(JSON.parse(storedUser));
    }
  }, [user]);

  const handleLogin = (userData) => {
    // Save the user data to local storage and set the login state
    localStorage.setItem("user", JSON.stringify(userData));
    setLoginUser(userData);
  };

  const handleLogout = () => {
    // Clear the user from local storage and reset the login state
    localStorage.removeItem("user");
    setLoginUser(null);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user && user._id ? (
                <Home setLoginUser={setLoginUser} handleLogout={handleLogout} />
              ) : (
                <Login setLoginUser={handleLogin} />
              )
            }
          />
          <Route path="/login" element={<Login setLoginUser={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
