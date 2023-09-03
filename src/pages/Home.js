import React, { useEffect, useState } from "react";
import FileUpload from './../components/FileUpload';
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const [Token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("Token"));
  });
  if (!Token) {
    navigate("/Login", { replace: true });
  }
  return (
    <div className="container">
      <div className=" mt-5 w-75 container">
        <FileUpload />
      </div>
    </div>
  );
}
