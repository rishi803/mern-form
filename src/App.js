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
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setLoginUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    // Save the user data to local storage and set the login state
    sessionStorage.setItem("user", JSON.stringify(userData));
    setLoginUser(userData);
  };



  return (
    <div className="App">
      {console.log(user)}
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user && user._id ? (
                <Home setLoginUser={setLoginUser} />
              ) : (
                <Login setLoginUser={handleLogin} />
              )
            }
          />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
