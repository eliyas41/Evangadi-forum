import React, { useEffect, useContext, useRef, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./axios/axiosConfig";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/LoginPage/Login";

import Register from "./pages/LoginPage/Register";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home/Home";
import NewQuestion from "./pages/Question/AskQuestion ";
import Answer from "./pages/Answer/Answer";
import { UserContext } from "./context/UserContext";

function App() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const tokenRef = useRef(localStorage.getItem("auth-token"));

  const checkUser = useCallback(async () => {
    if (!tokenRef.current) {
      localStorage.setItem("auth-token", "");
      tokenRef.current = "";
    } else {
      try {
        const userRes = await axios.get("/users/check", {
          headers: { Authorization: `Bearer ${tokenRef.current}` },
        });

        setUserData({
          token: tokenRef.current,
          user: {
            id: userRes.data.userid,
            display_name: userRes.data.username,
          },
          config: {
            headers: { Authorization: `Bearer ${tokenRef.current}` },
          },
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
        navigate("/login");
      }
    }
  }, [navigate, setUserData]);

  useEffect(() => {
    if (!userData.token) {
      checkUser();
    }
  }, [checkUser, userData.token]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/newquestion" element={<NewQuestion />} />
        <Route path="/newanswer/:id" element={<Answer />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
