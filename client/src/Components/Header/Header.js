import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "../../axios/axiosConfig";

import logo from "../../assests/Images/evangadi-logo-home.png";
import "./header.css";

const Header = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [loggedOut, setLoggedOut] = useState(false);
  const logoutButtonRef = useRef(null);

  const logout = async () => {
    try {
      await axios.post("/users/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      });
    } catch (error) {
      console.log(error.response);
    }

    setUserData({
      token: null,
      user: null,
      config: null,
    });
    localStorage.removeItem("auth-token");
    setLoggedOut(true);
    navigate("/login");
  };

  useEffect(() => {
    if (loggedOut && logoutButtonRef.current) {
      logoutButtonRef.current.blur();
    }
  }, [loggedOut]);

  return (
    <header className="navbar-header">
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Evangadi Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon icon_menu"></span>
          </button>

          <div
            className="collapse navbar-collapse bg-orange"
            id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link section-scroll">
                  Home
                </Link>
              </li>
              <li style={{ width: "150px" }} className="nav-item">
                <Link to="/explained" className="nav-link section-scroll">
                  How it works
                </Link>
              </li>
              <li>
                <div className="connect-block">
                  {userData.user ? (
                    <button
                      ref={logoutButtonRef}
                      className="lnk-toggler btn btn-blue"
                      onClick={logout}>
                      Log Out
                    </button>
                  ) : (
                    <Link className="lnk-toggler btn btn-blue" to="/login">
                      Sign In
                    </Link>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br />
    </header>
  );
};

export default Header;
