import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router";

import { createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";

import { auth } from "../Apis/fireBaseConfigs";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
      setShowPassword(prevState => !prevState);
    };
    const registerFunc = async () => {
      // console.log("==registerPassword", registerPassword);
      // console.log("==registerEmail", registerEmail);
      try {
        const theuser = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        ).then(() => navigate("/login"));
      } catch (error) {
        setErrorMsg(error?.code);
        // alert(error?.code);
      }
    };
    return (
      <>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
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
            setRegisterPassword(values.password);
            setRegisterEmail(values.email);
            registerFunc(values);
          }}
        >
          {({ errors, touched, isValid }) => (
            <Form className="  container w-50  ">
              {errorMsg ? (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              ) : null}
              <div className="mb-3">
                <label className="mb-1" htmlFor="email">
                  Email <span>*</span>
                </label>
                <Field
                  className="form-control "
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
                <div>
                  <Field
                    className="form-control container"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Please enter a strong password"
                  />
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
                  value=" Sign up"
                >
                  Sign up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
};

export default Register;
