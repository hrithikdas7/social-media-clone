import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";

import "./RegisterForm.scss";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.mixed().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: null,
};

const RegisterForm = ({  register }) => {
  return (
    <Formik
      onSubmit={register}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({ handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>First Name</label>
            <Field type="text" name="firstName" className="form-control" />
            <ErrorMessage name="firstName" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <Field type="text" name="lastName" className="form-control" />
            <ErrorMessage name="lastName" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <Field type="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Location</label>
            <Field type="text" name="location" className="form-control" />
            <ErrorMessage name="location" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Occupation</label>
            <Field type="text" name="occupation" className="form-control" />
            <ErrorMessage name="occupation" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label>Picture</label>
            <Dropzone
              className="dropzone"
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone-content">
                  <input {...getInputProps()} />
                  <div className="dropzone-text">
                    {!initialValuesRegister.picture ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <p>{initialValuesRegister.picture.name}</p>
                    )}
                  </div>
                </div>
              )}
            </Dropzone>
            <ErrorMessage name="picture" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              REGISTER
            </button>
          </div>

          <div className="form-group">
            <p >
              Already have an account? Login here.
            </p>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;

