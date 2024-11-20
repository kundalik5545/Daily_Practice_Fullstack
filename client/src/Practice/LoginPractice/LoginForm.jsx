import axiosInstance from "@/api/axios.js";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LogInContext } from "@/App";

function LoginForm() {
  const [formData, setFormData] = useState({ userName: "", userPassword: "" });

  const navigate = useNavigate();

  const { Login } = useContext(LogInContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/login/login-user", formData);

      if (res.data.success) {
        setFormData({ userName: "", userPassword: "" });

        toast.success(`Welcome ${res.data.message}`);

        Login(res.data.data.user);

        navigate("/if-log-in");
      } else {
        console.log("Testing else of login form");
      }
    } catch (error) {
      toast.error("Error in login");
      console.error("Error in login user", error);
    }
  };

  return (
    <div>
      <div className="login-form">
        <h3 className="pb-3 pt-3">Login Page</h3>

        <form onSubmit={handleLoginForm}>
          <input
            type="text"
            name="userName"
            required
            value={formData.userName}
            onChange={handleOnChange}
            placeholder="Enter User name"
          />
          <input
            type="password"
            name="userPassword"
            required
            value={formData.userPassword}
            onChange={handleOnChange}
            placeholder="Enter user password"
          />
          <button type="submit" className="bg-gray-100">
            Login User
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
