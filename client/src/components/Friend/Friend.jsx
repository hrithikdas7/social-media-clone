import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../../store/authSlice";
//import "./Friend.scss"; // Import the SCSS file for styling
import UserImage from "components/UserImage/UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);


  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const handleClick = () => {
    navigate(`/profile/${friendId}`);
    navigate(0);
  };

  return (
    <div className="friend-container">
      <div className="friend-info" onClick={handleClick}>
        <div className="user-image">
          {/* <img src={userPicturePath} alt="User" /> */}
          <UserImage image={userPicturePath} size="55px" />
        </div>
        <div className="user-details">
          <h5>{name}</h5>
          <p>{subtitle}</p>
        </div>
      </div>
      <button
        className={`friend-action ${isFriend ? "remove" : "add"}`}
        onClick={patchFriend}
      >
        {isFriend ? "Remove Friend" : "Add Friend"}
      </button>
    </div>
  );
};

export default Friend;
