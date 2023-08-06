import RegisterForm from "components/RegisterForm/RegisterForm";
import React from "react";
import { useNavigate } from "react-router-dom";
import './RegisterPage.scss'

const RegisterPage = () => {
  const navigate = useNavigate();
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      navigate("/");
    }
  };
  return (
    <div className="mainpage">
      <div className="image-conatiner">


      </div>
      <div className="conatiner">
        <div className="loginpage">
        <RegisterForm register={register} />
        </div>
      </div>
     
    </div>
  );
};

export default RegisterPage;
