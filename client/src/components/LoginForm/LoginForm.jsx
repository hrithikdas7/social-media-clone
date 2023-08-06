import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./LoginForm.scss";
import { Link } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginForm = ({ setPageType, login }) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Indie+Flower|Overpass+Mono"
        rel="stylesheet"
      />
      <div id="wrapper">
        <div className="main-content">
          <div className="header">
            <img src="https://i.imgur.com/zqpwkLQ.png" alt="Logo" />
          </div>
          <div className="l-part">
            <Formik
              onSubmit={login}
              initialValues={initialValuesLogin}
              validationSchema={loginSchema}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                errors,
                touched,
                handleBlur,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="email">
                    {/* <label htmlFor="email">Email</label> */}
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.email && errors.email ? "error" : ""}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="errorMessage"
                    />
                  </div>
                  <div className="password">
                    {/* <label htmlFor="password">Password</label> */}
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        touched.password && errors.password ? "error" : ""
                      }
                    />
                    {/* <ErrorMessage
                      name="password"
                      component="div"
                      className="errorMessage"
                    /> */}
                  </div>

                  {/* BUTTONS */}
                  <div>
                    <button className="btn" type="submit">
                      LOGIN
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="sub-content">
          <div className="s-part">
            Don't have an account?<Link to='/register'>Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
