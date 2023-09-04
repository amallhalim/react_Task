import React from "react";
import img from "../assets/notfound.png";
export default function Notfound() {
  return (
    <>
      <div>Notfound</div>
      <img src={img} alt={"not found "} style={{ width: "100%" }} />
      <div className="text-center">
        <h1 className="text-9xl font-bold">404</h1>
        <h1 className="fw-bolder">Page Not Found</h1>
        <p>we couldn't find what you were looking for.</p>
        <p>
          Please contact the owner of the site that linked you to the original
          URl and let them know their link is broken.
        </p>
      </div>
    </>
  );
}
