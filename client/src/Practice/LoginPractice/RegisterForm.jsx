import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function RegisterForm() {
  const [formData, setFormData] = useState({ userName: "", userPassword: "" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/login/register-user",
        formData
      );
      if (response.data.success) {
        toast.success(`Welcome ${response.data.data.userName}`);
        setFormData({ userName: "", userPassword: "" });
      }
    } catch (error) {
      toast.error("Please try again");
    }
  };

  return (
    <div>
      <div className="register-form">
        <h2 className="pb-3">Register Page</h2>
        <form onSubmit={handleRegisterUser}>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleOnChange}
            placeholder="Enter user name"
            required
          />
          <input
            type="password"
            name="userPassword"
            required
            value={formData.userPassword}
            onChange={handleOnChange}
            placeholder="Enter user password"
          />
          <button className="bg-gray-100" type="submit">
            Register User
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
