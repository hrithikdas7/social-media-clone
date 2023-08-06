import React from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "store/authSlice";
import { useNavigate } from "react-router-dom";
import './HomePage.scss'
import UserProfile from "components/UserProfile/UserProfile";
import Feed from "components/Feed/Feed";
import MyPost from "components/MyPost/MyPost";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(setLogout({ user: null, token: null }));
    navigate("/");
  };
  return (
    <div className="main-div">
      <div className="profile-message">
        <div className="profile">
          <UserProfile/>
        </div>
        <div className="message">
          <h1>message</h1>
        </div>
      </div>
      <div className="addpost-feed">
        <div className="addpost">
          {/* <h1>addpost</h1> */}
          <MyPost/>
        </div>
        <div className="feed">
          <h1>feed</h1>
           <Feed/>
        </div>
      </div>
      <div className="friend-list">
        <div className="freindlist">
          <h1>friendlist</h1>
          {/* <FriendList/> */}
        </div>
      </div>
     
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
