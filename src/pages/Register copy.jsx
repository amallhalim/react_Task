import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Apis/fireBaseConfig";

function Register() {
  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  // });

  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [user, setUser] = useState({});

  const registerfunc = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        {" "}
        <input
          placeholder="email"
          onChange={e => {
            setRegisterEmail(e.target.value);
          }}
        />
      </div>
      <div>
        {" "}
        <input
          placeholder="password"
          onChange={e => {
            setRegisterPassword(e.target.value);
          }}
        />
      </div>

      <button onClick={registerfunc}> register </button>
    </>
  );
}

export default Register;
