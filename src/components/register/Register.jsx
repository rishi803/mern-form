import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = "https://auth-mern-gveb.onrender.com";
const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleinput = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const register = async () => {
    const { name, email, password, reEnterPassword } = user;

    if (name && email && password && password === reEnterPassword) {
      await axios
        .post(`${baseURL}/register`, user)
        .then(function (response) {
          if (response.data === "Exist") {
            alert("User Already Registered");
          } else {
            navigate("/login");
            alert("Registration Successfull, Please Login");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      {/* {console.log(user)} */}
      <h2>Register</h2>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Your Name"
        onChange={handleinput}
      />
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Your Email"
        onChange={handleinput}
      />
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Please Enter Password"
        onChange={handleinput}
      />
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="ReEnter Password"
        onChange={handleinput}
      />
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={handleLogin}>
        Login
      </div>
    </div>
  );
};

export default Register;
