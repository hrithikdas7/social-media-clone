import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "pages/loginPage/LoginPage";
import HomePage from "pages/homePage/HomePage";
import ProfilePage from "pages/profilePage/ProfilePage";
import { useSelector } from "react-redux";
import RegisterPage from "pages/RegisterPage/RegisterPage";

function App() {
  const isAuth = Boolean(useSelector((state)=> state.token))
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/home" element={ isAuth? <HomePage /> : <Navigate to='/'/>} />
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
