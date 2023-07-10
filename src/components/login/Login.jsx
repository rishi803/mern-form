import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleinput = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async () => {
    const { email, password } = user;

    if (email && password) {
      await axios
        .post("http://localhost:8000/login", {
          //user  //if pass user it will {{user: { email: 'f@gmail.com', password: 'b37D3@iG7GXw2C4' }}} destruturing will not work
          email,
          password, // will pass { email: 'f@gmail.com', password: 'b37D3@iG7GXw2C' }
        })
        .then(function (response) {
          if (response.data === "UserNotExist") {
            alert("User not Registered, Please Register first");
          } else if (response.data.message === "UserExist") {
            setLoginUser(response.data.user);
            navigate("/");
            alert("Login Successfully");
          } else {
            alert("Wrong Password");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      // alert("Login Successfull");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      {/* {console.log(user)} */}
      <h2>Login</h2>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleinput}
        placeholder="Enter your Email"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleinput}
        placeholder="Enter your Password"
      />
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      <div className="button" onClick={handleRegister}>
        Register
      </div>
    </div>
  );
};

export default Login;
