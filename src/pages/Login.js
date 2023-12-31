import React, { useState } from "react";
import { useNavigate } from "react-router";

import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Apis/fireBaseConfigs";
import style from "./../index.module.css";
// font awesom
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = ({ setIsLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    // Sign in existing users
    // const loginFunc = async values => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        userCredential => {
          // Signed in
          const Token = userCredential.user.accessToken;
          localStorage.setItem("Token", Token);
          setSuccessMsg("you are now log in");
          setErrorMsg("");
          setIsLoggedIn(true);

          //after login sucess navigate to home page
          navigate("/Home", { replace: true });
        }
      );
    } catch (error) {
      setErrorMsg(error.code);
      // alert(error?.code);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-center fw-bold">Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Email is required")
            .matches(
              /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
              "Email must be a valid email address"
            ),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={handleSubmit}
        validateOnSubmit={true}
        initialTouched={{ email: true }}
      >
        {({ errors, touched, isValid }) => (
          <Form
            className={` ${style.responsivecontainer}
            `}
          >
            {errorMsg ? (
              <div className="alert alert-danger" role="alert">
                {errorMsg}
              </div>
            ) : null}
            {successMsg ? (
              <div className="alert alert-success" role="alert">
                {successMsg}
              </div>
            ) : null}
            <div className="mb-3">
              <label className="mb-1" htmlFor="email">
                Email <span>*</span>
              </label>
              <Field
                className={`form-control ${style.input}`}
                name="email"
                type="email"
                id="email"
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
              <div className={style.passwordInputWrapper}>
                <Field
                  className="form-control container"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Please enter a password"
                />
                <span
                  className={style.togglePasswordVisibilityButton}
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
                login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
