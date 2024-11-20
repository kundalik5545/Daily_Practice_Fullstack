import React, { useState, useContext } from "react";
// import { LogInContext } from "../App";
import axios from "axios";

function Login({ isLogIn }) {
  // const { userLoggInStatus, isLoggedIn } = useContext(LogInContext);

  const [loginFormData, setloginFormData] = useState({
    userId: "",
    userPassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setloginFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    console.log("Value inside loginFormdata:-", loginFormData);
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/login",
      loginFormData
    );

    if (response.data.success) {
      // userLoggInStatus(true);
    } else {
      // userLoggInStatus(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <p>
        User Status:
        {isLogIn ? (
          <>
            <span className="user-status-login">logIn</span>
            <p>Welcome, User!</p>
          </>
        ) : (
          <>
            <span className="user-status-logout">log Out</span>
            <p>Please Login!</p>
          </>
        )}
      </p>
      <div className="register-user">
        <form>
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="enter name"
          />
          <input
            type="text"
            name="userId"
            id="userId"
            placeholder="enter userId"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="enter password"
          />
          <button type="submit">Register User</button>
        </form>
      </div>
      <div className="login-user">
        <form onSubmit={handleUserLogin}>
          <input
            type="text"
            name="userId"
            id="user-id"
            placeholder="enter user id"
            value={loginFormData.userId}
            onChange={handleOnChange}
          />
          <input
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="enter password"
            value={loginFormData.userPassword}
            onChange={handleOnChange}
          />
          <button type="submit">Login User</button>
        </form>
      </div>

      <button>Log out User</button>
    </div>
  );
}

export default Login;
