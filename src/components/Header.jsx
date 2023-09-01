import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Logout from "./Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCircle } from "@fortawesome/free-regular-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./Header.css";

export default function Header() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  let currentToken; 
  useEffect(() => {
    const getToken = () => {
       currentToken = localStorage.getItem("Token");
      setToken(localStorage.getItem("Token"));
      // console.log("currentToken", currentToken);
      // console.log("token", token);
    };
    getToken();
  }, [currentToken]);
        // console.log("token", token);

  return (
    <div className="header bg-danger">
      <nav className=" navbar navbar-dark bg-dark ">
          <li className="nav-item ms-2 ">
        <Link
          className=" nav-link  me-2 ms-0 pb-2 pt-0 mt-0"
          style={{ color: "#d0d7e1" }}
          to="/Home"
        >
          {" "}
          register system
        </Link>
        </li>
        <ul className="navbar-nav  mt-2 mt-lg-0 d-flex justify-content-spaceBetween px-2  flex-row ">
          <li className="nav-item me-2 ">
            <Link className="nav-link font-weight-bold" to="/Register">
              Register
              <FontAwesomeIcon
                className=" fs-6 ps-1"
                icon={faUserCircle}
                style={{ color: "#d0d7e1" }}
              />
            </Link>
          </li>

          <li className="nav-item me-2">
            {token ? (
              <Logout />
            ) : (
              <Link className="nav-link font-weight-bold" to="/login">
                login
                <FontAwesomeIcon
                  className=" fs-6 ps-1"
                  icon={faUser}
                  style={{ color: "#d0d7e1" }}
                />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
