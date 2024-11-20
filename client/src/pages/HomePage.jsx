import React, { useContext, useEffect, useState } from "react";
import Login from "../components/Login";
import IndianRuppeFormator from "../Practice/CurrencyConvertor/IndianRuppeFormator";
import ShadcnCharts from "@/Practice/ChartPractice/ShadcnCharts";
import RFinanceChart from "@/Practice/ChartPractice/RFinanceChart";
import RegisterForm from "@/Practice/LoginPractice/RegisterForm";
import LoginForm from "@/Practice/LoginPractice/LoginForm";
import { LogInContext } from "@/App";

function HomePage() {
  const { isLogIn, Logout, Login } = useContext(LogInContext);
  const [Status, setStatus] = useState("");
  const statusCheck = () => {
    if (isLogIn) {
      setStatus("isLoggedIn:- true");
    } else {
      setStatus("isLoggedIn:- false");
    }
  };
  return (
    <>
      <div className="pt-3">
        {/* <Login /> */}
        {/* <IndianRuppeFormator /> */}
        {/* <ShadcnCharts />
      <RFinanceChart /> */}
      </div>

      <div className="user-login-test">
        <RegisterForm />
        {isLogIn ? (
          <>
            <button className="bg-gray-100" onClick={Logout}>
              LogOut
            </button>
          </>
        ) : (
          <LoginForm />
        )}
      </div>
      <div className="p-4">
        <button onClick={statusCheck} className="bg-gray-100">
          Check status
        </button>
        <p className="pt-3 text-black gap-3">
          User Loggin status <span className="text-green-600">{Status}</span>
        </p>
      </div>
    </>
  );
}

export default HomePage;
