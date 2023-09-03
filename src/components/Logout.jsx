import React, { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../Apis/fireBaseConfigs";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  // let result;

  const signOutFunc = async () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(" are sure that you want to logout");

    if (result === true) {
      // const auth = getAuth();
      try {
        await signOut(auth);

        onLogout();

        // setIsLoggedIn(false);
        localStorage.removeItem("Token");
        localStorage.removeItem("refreshToken");
        navigate("/Register", { replace: true });
        alert(" you are Sign-out correctly");
      } catch (error) {
        // console.log("Sign-out An error happened..");
        alert("Sign-out An error happened.");
      }
    }
  };

  return (
    <>
      <button onClick={signOutFunc} className="btn btn-danger">
        Logout
      </button>
    </>
  );
}
