import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import IfLogIn from "./Practice/LoginPractice/IfLogIn";
import Services from "./pages/Services";
import ProtectedRoute from "./Utils/ProtectedRoute";
export const LogInContext = createContext();

function App() {
  const [isLogIn, setIsLogedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve token or user data from storage
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLogedIn(true);
    }
  }, []);

  const Login = (userData) => {
    setIsLogedIn(true);
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const Logout = () => {
    setIsLogedIn(false);
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <>
      <LogInContext.Provider
        value={{
          isLogIn,
          Login: Login,
          Logout: Logout,
          user: user,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/if-log-in" element={<IfLogIn />} />
            <Route path="/services" element={<Services />} />
          </Route>
        </Routes>
      </LogInContext.Provider>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
