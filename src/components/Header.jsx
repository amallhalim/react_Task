import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import Logout from "./Logout";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  let token;
  useEffect(() => {
    token = localStorage.getItem("Token");
    setIsLoggedIn(true);

    if (!token) {
      navigate("/Login", { replace: true });
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <div className="header bg-danger fixed-top">
      <nav className=" navbar navbar-dark bg-dark ">
        <li className="nav-item  ms-2 fst-italic fw-bolder">
          <NavLink
            className=" nav-link  me-2 ms-0 pb-2 pt-0 fs-4 mt-0"
            style={{ color: "#d0d7e1" }}
            to={isLoggedIn ? "/Home" : "/Login"}
          >
            {" "}
            Home
          </NavLink>
        </li>
        <ul className="navbar-nav  mt-2 mt-lg-0 d-flex justify-content-spaceBetween px-2  flex-row ">
          <li className="nav-item me-2 ">
            <NavLink className="nav-link font-weight-bold" to="/Register">
              Register
              <FontAwesomeIcon
                className=" fs-6 ps-1"
                icon={faUserCircle}
                style={{ color: "#d0d7e1" }}
              />
            </NavLink>
          </li>

          <li className="nav-item me-2">
            {isLoggedIn ? (
              <Logout onLogout={() => setIsLoggedIn(false)} />
            ) : (
              <NavLink className="nav-link font-weight-bold" to="/login">
                login
                <FontAwesomeIcon
                  className=" fs-6 ps-1"
                  icon={faUser}
                  style={{ color: "#d0d7e1" }}
                />
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
