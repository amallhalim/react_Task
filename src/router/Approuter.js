import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

import Notfound from "../pages/Notfound";
import Register from "../pages/Register";
import LayoutWithNav from "../components/LayoutWithNav.js";
import Login from './../pages/Login';



export default function Approuter() {
  return (
    <Routes>
      <Route element={<LayoutWithNav />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<h1>Loading ...</h1>}>
              <Home />
            </Suspense>
          }
        />

        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
      {/* <Route path="*" element={<Notfound />} /> */}
    </Routes>
  );
}
