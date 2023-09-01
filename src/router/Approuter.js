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
          path="/Home"
          element={
            <Suspense fallback={<h1>Loading ...</h1>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/Register"
          element={
            <Suspense fallback={<h1>Loading ...</h1>}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<h1>Loading ...</h1>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/*"
          element={
            <Suspense fallback={<h1>Loading ...</h1>}>
              <Notfound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
