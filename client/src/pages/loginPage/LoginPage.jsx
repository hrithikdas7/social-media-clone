import React from 'react'
import LoginForm from 'components/LoginForm/LoginForm'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from 'store/authSlice';
// import './LoginPage.scss'


const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  
  
  return (
    <div className='login-page-container'>
      <LoginForm login={login}/>
    </div>
  )
}

export default LoginPage