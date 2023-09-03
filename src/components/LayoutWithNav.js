import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function LayoutWithNav({ isLoggedIn, setIsLoggedIn }) {
  return (
    <>
      <Header
        className="mb-5 pb-5"
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className=" my-5 py-5  ">
        <Outlet />
      </div>
    </>
  );
}
