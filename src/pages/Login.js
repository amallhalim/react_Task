import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Apis/fireBaseConfigs";

// font awesome
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

// Sign in existing users 
  const loginFunc = async (values) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      ).then(userCredential => {
        // Signed in
        const Token = userCredential.user.accessToken;
        localStorage.setItem("Token", Token);
      });
      console.log("result", result);
        navigate("/");
    } catch (error) {
        alert(error?.code);
        
  
    
    }
  };

  console.log(user)
    return (
      <>
        <Formik
          initialValues={{ ...user }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required("Email is required")
              .matches(
                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                "Email must be a valid email address"
              ),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={values => {
            setLoginPassword(values.password);
            setLoginEmail(values.email);
            loginFunc(values);
            setUser(values.email,values.password)
          }}
        >
          {({ errors, touched, isValid }) => (
            <Form className="  container w-50 ">
              <div className="mb-3">
                <label className="mb-1" htmlFor="email">
                  Email <span>*</span>
                </label>
                <Field
                  className="form-control "
                  name="email"
                  type="email"
                  placeholder="Please enter your email address"
                />
                {errors.email && touched.email ? (
                  <span className="text-danger ms-2"> {errors.email}</span>
                ) : null}
              </div>
              <div className="mb-3">
                <label className="mb-1" htmlFor="password">
                  Password <span>*</span>
                </label>
                <div>
                  <Field
                    className="form-control container"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Please enter a strong password"
                  />
                  <span
                    // className={styles.togglePasswordVisibilityButton}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </span>
                </div>
                {errors.password && touched.password ? (
                  <span className="text-danger ms-2">{errors.password}</span>
                ) : null}
              </div>
              <div>
                <button
                  disabled={!isValid}
                  type="submit"
                  className="btn bg-primary"
                  value=" login"
                >
                  login=
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
};

export default Login;

