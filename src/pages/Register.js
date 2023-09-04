import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Apis/fireBaseConfigs";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import style from "./../index.module.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        "Email must be a valid email address"
      ),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (error) {
      setErrorMsg(error?.code);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {" "}
      <h2 className="text-center fw-bold">Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid }) => (
          <Form className={`${style.responsivecontainer} `}>
            {errorMsg && (
              <div className="alert alert-danger" role="alert">
                {errorMsg}
              </div>
            )}
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
              {errors.email && touched.email && (
                <span className="text-danger ms-2">{errors.email}</span>
              )}
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
              {errors.password && touched.password && (
                <span className="text-danger ms-2">{errors.password}</span>
              )}
            </div>
            <div>
              <button
                disabled={!isValid}
                type="submit"
                className="btn bg-primary text-light px-3"
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
